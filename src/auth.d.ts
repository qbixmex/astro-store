import { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    createdAt?: string;
    role?: string;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}