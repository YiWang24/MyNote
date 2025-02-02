import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authApi } from "./api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("Please enter email and password");
        }
        const response = await authApi.login({ email, password });
        const accessToken = response.data.token;

        return {
          accessToken,
        };
      },
    }),
  ],
  //custom
  pages: {
    signIn: "/auth?type=login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      // console.log("signIn callback", { user, account });
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const { provider, providerAccountId, access_token, id_token } =
            account;
          await authApi.login({
            provider,
            providerAccountId,
            access_token,
            id_token,
          });
          // console.log("response", response);
        } catch (error) {
          throw new Error(`Failed to sign in with ${provider}`);
        }
        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // console.log("jwt callback", { token, user, account });
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        const { provider, providerAccountId, access_token, id_token } = account;
        const response = await authApi.login({
          provider,
          providerAccountId,
          access_token,
          id_token,
        });
        const accessToken = response.data.token;
        return { accessToken };
      } else {
        if (user) {
          return { ...token, ...user };
        }
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session, token);
      if (token) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
