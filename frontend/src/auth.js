import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/mongodb";
import { User } from "./models/User";
import { compare } from "bcryptjs";

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
        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
          throw new Error("Invalid email or password");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          role: user.role,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/auth?type=login",
  },
  callbacks: {
    async jwt({ token, user, account, session }) {
      // console.log("jwt callback",{token,user,session})
      // console.log("jwt", account);
      // console.log(account.access_token);
      // const tokens = {
      //   ...token,
      //   ...user,
      //   accessToken: account?.access_token,
      //   provider: account?.provider,
      // };
      // console.log(tokens);

      // if (user) {
      //   token.sub = user.id;
      //   token.image = user.image;
      //   token.email = user.email;
      //   token.role = user.role;
      // }
      // if (profile) {
      //   token.name = profile.name;
      //   token.email = profile.email;
      // }

      // if (account) {
      //   token.accessToken = account.access_token ?? "";
      // }

      return {
        ...token,
        ...user,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: account?.provider,
      };
    },
    async session({ session, token ,user}) {
      // console.log("session", token);
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.provider = token.provider;
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
