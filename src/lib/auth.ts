import { NextAuthOptions } from "next-auth";

import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) throw data;

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 14 * 60 * 1000,
    };
  } catch (error) {
    console.error("Refresh Token Error:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        const response = await res.json();

        if (!res.ok || !response?.success) {
          throw new Error(response?.message || "Login failed");
        }

        const { user, accessToken, refreshToken } = response.data;
        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        fullName: token.fullName,
        email: token.email,
        role: token.role,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      session.error = token.error;
      return session;
    },
  },
};


export async function logout(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Logout faild");
  return resData;
}
