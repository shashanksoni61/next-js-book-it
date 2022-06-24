import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import User from "@models/User";
import connectDB from "@config/db/db";
import colors from "colors";

export default connectDB(
  NextAuth({
    session: {
      jwt: true,
    },

    jwt: {
      secret: "test",
      encryption: true,
    },
    baseUrl: process.env.NEXTAUTH_URL,
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Please enter email or password");
          }

          const user = await User.findOne({ email }).select("+password");

          if (!user) throw new Error("Invalid Email or Password");

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) throw new Error("Invalid Email or Password");

          console.log(colors.cyan({ user }));
          return user;
        },
      }),
    ],

    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user;
          token._message = "Custom Message Added By Me For Checking";
        }
        return token;
      },

      session: async ({ session, token }) => {
        console.log(colors.red({ session, token }));
        session.user = token.user; // Setting token in session
        return session;
      },
    },

    pages: {
      signIn: "/login",
      // signOut: "/v1/auth/signout",
      // error: "/v1/auth/error", // Error code passed in query string as ?error=
      // verifyRequest: "/v1/auth/verify-request", // (used for check email message)
      // newUser: "/v1/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
  })
);
