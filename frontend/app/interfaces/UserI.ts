import { Session } from "next-auth";

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
}
