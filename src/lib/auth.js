import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) return null;

        const jwtSecretObject = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET);
        if (!jwtSecretObject || !jwtSecretObject.key) {
            console.error("JWT Secret Key is not configured correctly.");
            return null;
        }

        try {
            const decoded = jwt.verify(token, jwtSecretObject.key);
            const hasuraClaims = decoded['https://hasura.io/jwt/claims'];

            if (!hasuraClaims) return null;

            // Return user object compatible with AuthContext
            return {
                id: hasuraClaims['x-hasura-user-id'],
                accessToken: token, // Needed for Apollo Client
                displayName: decoded.displayName || 'قارئ',
                email: decoded.email,
                role: hasuraClaims['x-hasura-default-role'],
            };
        } catch (err) {
            // Token invalid or expired
            return null;
        }
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}
