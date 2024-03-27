import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser } from "../actions";
import { SuperSession } from "../interfaces/UserI";
import { JWT } from "next-auth/jwt";




// async function refreshAccessToken(token: JWT) {
//   try {
//     const params = new URLSearchParams({
//       client_id: process.env.GOOGLE_CLIENT_ID as string,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
//       grant_type: "refresh_token",
//       refresh_token: token.,
//     });

//     const url =
//       "https://oauth2.googleapis.com/token?" + params.toString();
//     console.log(url)
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     }
//   } catch (error) {
//     console.log(error)

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     }
//   }
// }




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
        if (res) {
          const userData = await res.json();
          const newSession: SuperSession = { ...session, userData, token };
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
    async jwt({ token, account }) {
            // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      if (Date.now() < (account?.expires_at as number)) {
        return token;
      }
      return token
      // return refreshAccessToken(token);
    },
  },
};
