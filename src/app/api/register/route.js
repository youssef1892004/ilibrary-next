// src/app/api/register/route.js
import bcrypt from 'bcrypt';

// هذه الدالة هي الـ Webhook الخاص بنا
export async function POST(request) {
  // 1. استخلاص البيانات من الواجهة الأمامية
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "الرجاء ملء جميع الحقول." }), { status: 400 });
  }

  // 2. تشفير كلمة المرور بشكل آمن
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. بناء الـ mutation لإرسال البيانات المشفرة إلى Hasura
  const mutation = {
    query: `
      mutation InsertUser($object: auth_users_insert_input!) {
        insert_auth_users_one(object: $object) {
          id
          email
        }
      }
    `,
    variables: {
      object: {
        display_name: name,
        email: email,
        password_hash: hashedPassword, // إرسال كلمة المرور المشفرة
        locale: 'ar',
        default_role: 'user'
      }
    }
  };

  // 4. إرسال الطلب إلى Hasura
  try {
    const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify(mutation),
    });

    const data = await response.json();

    if (data.errors) {
      // التعامل مع أخطاء Hasura (مثل البريد المكرر)
      if (data.errors[0].message.includes('Uniqueness violation')) {
        return new Response(JSON.stringify({ message: "هذا البريد الإلكتروني مسجل بالفعل." }), { status: 409 }); // 409 Conflict
      }
      throw new Error(data.errors[0].message);
    }

    return new Response(JSON.stringify(data.data.insert_auth_users_one), { status: 200 });

  } catch (error) {
    console.error("Error during Hasura mutation:", error);
    return new Response(JSON.stringify({ message: error.message || "فشل الاتصال بالخادم." }), { status: 500 });
  }
}