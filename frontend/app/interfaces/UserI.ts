import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface UserI {
  location: string;
  rating?: number | null;
  bio: string;
  userID: string;
  email: string;
  name: string;
  ratingCount: number;
  phoneNum?: string;
}
export interface SuperSession extends Session {
  userData: UserI;
  token: JWT;
}
