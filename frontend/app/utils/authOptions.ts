import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser } from "../actions";
import { SuperSession } from "../interfaces/UserI";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        const res = await authenticateUser(session);
        // Ensure res is a fetch response and has .json() method
        if (res && typeof res.json === "function") {
          const userData = await res.json();
          const newSession: SuperSession = { ...session, userData };
          return newSession;
        } else {
          console.error(
            "authenticateUser did not return a valid response:",
            res
          );
          // Handle the error or return the session unmodified
          return session;
        }
      } catch (error) {
        console.error("Error in session callback:", error);
        // Return the session unmodified or handle error as needed
        return session;
      }
    },
  },
};
