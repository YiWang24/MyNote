import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/mongodb";
import { User } from "./models/User";
import { compare } from "bcryptjs";
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

        const user = response.data.user;
        const accessToken = response.data.token;

        return {
          id: user.id,
          name: user.firstName,
          email: user.email,
          image: user.image,
          accessToken,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth?type=login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt callback", { token, user });

      return {
        ...token,
      };
    },
    async session({ session, token }) {
      // console.log("session", token);

      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "github" || account?.provider === "google") {
        const provider = account.provider;
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });
          // console.log(alreadyUser);
          if (
            alreadyUser &&
            (!alreadyUser[`${provider}ProviderId`] ||
              alreadyUser[`${provider}ProviderId`] !== id)
          ) {
            console.log("updating");
            await User.updateOne(
              { email },
              {
                [`${provider}ProviderId`]: id,
              }
            );
          }

          if (!alreadyUser) {
            console.log("creating");
            await User.create({
              email,
              firstName: name,
              lastName: name,
              image,
              [`${provider}ProviderId`]: id,
            });
          } else {
            return true;
          }
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
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
