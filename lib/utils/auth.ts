
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { compare } from "bcryptjs";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const extentigUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!extentigUser) {
          return null;
        }
        const passwordMath = await compare(
          credentials.password,
          extentigUser.password,
        );
        if (!passwordMath) {
          return null;
        }
        return {
          id: `${extentigUser.id}`,
          username: extentigUser.username,
          email: extentigUser.email,
        };
      },
    }),
  ],
};
