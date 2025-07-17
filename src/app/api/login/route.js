// src/app/api/login/route.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  // 1. استخلاص الإيميل وكلمة المرور من الطلب القادم من Hasura
  const { input } = await request.json();
  const { email, password } = input;

  // 2. بناء استعلام GraphQL لجلب المستخدم وبياناته من Hasura
  const GET_USER_QUERY = `
    query GetUser($email: citext!) {
      auth_users(where: {email: {_eq: $email}}) {
        id
        display_name
        email
        password_hash
        roles {
          role
        }
      }
    }
  `;

  // 3. إرسال الاستعلام إلى Hasura باستخدام صلاحيات الأدمن للبحث عن المستخدم
  const hasuraResponse = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query: GET_USER_QUERY, variables: { email } }),
  });

  const hasuraData = await hasuraResponse.json();
  const user = hasuraData.data.auth_users[0];

  // إذا لم يتم العثور على المستخدم، فهذا يعني أن الإيميل خطأ
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  // 4. مقارنة آمنة لكلمة المرور التي أدخلها المستخدم مع النسخة المشفرة
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  // إذا كانت كلمة المرور غير صحيحة
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  // 5. إذا كانت كلمة المرور صحيحة، قم بإنشاء توكن (JWT)
  const userRoles = user.roles.map(r => r.role);
  const allowedRoles = ['user', ...userRoles];
  const defaultRole = user.roles.length > 0 ? user.roles[0].role : "user";
  
  const claims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": allowedRoles,
      "x-hasura-default-role": defaultRole,
      "x-hasura-user-id": user.id,
    },
  };

  const accessToken = jwt.sign(claims, process.env.HASURA_JWT_SECRET, { expiresIn: '1h' });

  // 6. إرجاع كائن الجلسة الذي يحتوي على التوكن وبيانات المستخدم
  const session = {
    accessToken,
    user: {
      id: user.id,
      displayName: user.display_name,
      email: user.email,
      roles: allowedRoles,
    }
  };

  return new Response(JSON.stringify(session), { status: 200 });
}