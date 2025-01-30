import { auth } from "@/auth";
import { cache } from "react";
import { encode } from "next-auth/jwt";
export const getSession = cache(async () => {
  const session = await auth();
  // console.log(session, "this is the session");
  // if (session) {
  //   // Get session token expiration time
  //   const sessionExp = session.exp;
  //   // Calculate 1 hour from now
  //   const oneHourExp = Math.floor(Date.now() / 1000) + 60 * 60;
  //   // Use the smaller expiration time
  //   const exp = Math.min(sessionExp, oneHourExp);

  //   const payload = {
  //     sub: session.user.id,
  //     email: session.user.email,
  //     role: session.user.role,
  //     exp: exp,
  //     iat: Math.floor(Date.now() / 1000),
  //     jti: crypto.randomUUID(),
  //   };

  //   const token = await encode({
  //     token: payload,
  //     salt: "",
  //     secret: new TextEncoder().encode(process.env.AUTH_SECRET),
  //     algorithm: "HS512"
  //   });
  //   // console.log(session);
  //   // console.log(token);
  //   return {
  //     ...session,
  //     jwtToken: token,
  //   };
  // }
  return session;
});
