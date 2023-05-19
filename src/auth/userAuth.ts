import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export function authorization(Request, Response, next): void {
  const headerToken = Request.headers["authorization"];
  const token = headerToken && headerToken.split(" ")[1];

  if (token == null) {
    return Response.status(401).send("Access Denied");
  }
  if (!token) {
    return Response.status(401).send("Access Denied");
  }
  try {
    const userVerified = jwt.verify(token, secret);
    Request.user = userVerified;
    next();
  } catch (error) {
    Response.status(401).send("Access Denied");
  }
}
