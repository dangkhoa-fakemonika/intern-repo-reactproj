import {NextFunction, Request, Response} from "express";
import {getAccessToken} from "@/shared/helpers/get-access-token";
import {INTERNAL_SERVER_ERROR, NOT_AUTHORIZED} from "@/shared/constants";
import {JwtService} from "@/shared/services/jwt-service";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (accessTokenSecret === undefined || refreshTokenSecret === undefined) {
    return res.status(INTERNAL_SERVER_ERROR).send("Secret service not available");
  }

  const accessToken = getAccessToken(req.headers.authorization);
  if (!JwtService.verifyToken(accessToken, "access")){
    return res.status(NOT_AUTHORIZED).send("Invalid access token");
  }

  return next();
}