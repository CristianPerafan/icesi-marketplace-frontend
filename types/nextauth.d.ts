import NextAuth, { type DefaultSession } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";

export type UserTypes = {
  id: string;
  email: string | null;
  name: string | null;
  lastName: string | null;
  roles : string[];
  token: string; 
};

export type ExtendedUser = DefaultSession["user"] & UserTypes;
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;  
  }
}

type ExtendedJWT = DefaultJWT & UserTypes;
declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {
    roles: string[];
  }
}