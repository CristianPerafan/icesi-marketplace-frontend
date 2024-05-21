import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import axios from "axios";
import { getUserById } from "./data/user";


export default {

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {

        const email = credentials.email;
        const password = credentials.password;

        const url= `${process.env.BACKEND_URL}/auth/login`;
        
        const response = await axios.post(url, {
          "email": email,
          "password": password
        });

    
        const user = response.status === 200 ? response.data : null;  
        

        if(!user) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.roles = token.roles;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.roles = user.roles;
      return token;
    },
  },
  jwt: { maxAge: 365 * 24 * 60 * 60 },
  session: { strategy: "jwt", maxAge: 365 * 24 * 60 * 60 },
} satisfies NextAuthConfig;