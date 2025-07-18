// src/app/api/register/route.js
import bcrypt from 'bcrypt';

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  if (!process.env.HASURA_GRAPHQL_URL || !process.env.HASURA_ADMIN_SECRET) {
    return jsonResponse({ message: 'خطأ في إعدادات الخادم.' }, 500);
  }

  try {
    const body = await request.json();
    const { displayName, email, password } = body;

    if (!displayName || !email || !password) {
      return jsonResponse({ message: 'الرجاء ملء جميع الحقول.' }, 400);
    }

    const password_hash = await bcrypt.hash(password, 10);

    const INSERT_USER_MUTATION = `
      mutation insertUser($object: users_insert_input!) {
        insertUser(object: $object) { id email displayName }
      }
    `;

    const variables = {
      object: {
        displayName: displayName,
        email: email,
        passwordHash: password_hash,
        locale: 'ar',
        roles: { data: { role: "user" } }
      }
    };

    const hasuraResponse = await fetch(process.env.HASURA_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({ query: INSERT_USER_MUTATION, variables: variables })
    });

    const hasuraData = await hasuraResponse.json();
    if (hasuraData.errors) {
        throw new Error(hasuraData.errors[0].message);
    }

    return jsonResponse(hasuraData.data.insertUser, 201);
  } catch (error) {
    return jsonResponse({ message: error.message || 'An unexpected error occurred' }, 500);
  }
}