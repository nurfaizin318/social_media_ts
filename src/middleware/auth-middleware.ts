import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import jwt from "jsonwebtoken"


type CustomPayload = {
  phoneNumber: string
}

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const jwtKey = "ini-rahasia"

  if (token == null) {
    return res.status(401).json({
      message: "unauthorized"
    })

  } else {
    jwt.verify(token, jwtKey, (err, payload) => {

      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log("token expired")

          const refreshToken: string = req.headers['refresh-token'] as string;
          const refresh_key = process.env.JWT_REFRESH_KEY || ""


          jwt.verify(refreshToken, refresh_key, (err, user) => {

            let mayPayload = user as CustomPayload

            if (err) return res.sendStatus(403);

            const newAccessToken = jwt.sign({ phone_number: mayPayload.phoneNumber }, refresh_key, { expiresIn: '15m' });
            console.log("generated new token", newAccessToken)

            req.headers = {
              Authorization: `Bearer ${newAccessToken}`,
            }

            next()
          });

        } else if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ code: 401, status: false, message: "unauthorized" })
        } else {
          return res.status(403).json({ message: 'Access token is invalid for another reason' });
        }
      }
      else {
        next()
      }
    });

  }


}
