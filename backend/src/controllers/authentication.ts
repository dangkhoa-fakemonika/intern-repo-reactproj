import bcrypt from "bcrypt";
import {NextFunction, Request, Response} from "express";
import {getAccessToken} from "@/shared/helpers/get-access-token";
import {CREATED, BAD_REQUEST, NOT_ACCEPTABLE, SUCCESS, NOT_AUTHORIZED} from "@/shared/constants";
import {JwtService} from "@/shared/services/jwt-service";
import {
  createCredential,
  readCredential,
  readUserInformation,
  updateCredential
} from "@/shared/services/database/users";

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;


  const result = await createCredential(email, password);
  if (result)
    return res.status(CREATED).send(result);
  else
    return res.status(BAD_REQUEST).send("Can't create user");
}

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  const storedPassword = await readCredential(email);

  if (storedPassword === undefined) {
    return res.status(BAD_REQUEST).send("No user exists");
  }

  const match = bcrypt.compareSync(password, storedPassword.password);
  if (match) {
    const accessToken = JwtService.signAccessToken(email);
    const refreshToken = JwtService.signRefreshToken(email);

    return res.status(CREATED).send({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } else {
    return res.status(NOT_ACCEPTABLE).send("Incorrect credentials");
  }
}

export const refreshTokenFunction = (req: Request, res: Response, _next: NextFunction) => {
  const refreshTokenString = req.body.refresh_token;
  const refreshToken = JwtService.verifyToken(refreshTokenString, "refresh");

  if (refreshToken === undefined || refreshToken.sub === undefined){
    return res.status(NOT_AUTHORIZED).send("Invalid token");
  }

  const accessToken = JwtService.signAccessToken(refreshToken.sub);

  return res.status(CREATED).send({
    access_token: accessToken,
    refresh_token: refreshTokenString
  });

}

export const changePassword = async (req: Request, res: Response, _next: NextFunction) => {
  const accessTokenString = getAccessToken(req.headers.authorization);
  const accessToken = JwtService.verifyToken(accessTokenString, "access");

  if (accessToken === undefined || accessToken.sub === undefined){
    return res.status(NOT_AUTHORIZED).send("Invalid access token");
  }

  const newPassword = req.body.password;
  const result = await updateCredential(accessToken.sub, newPassword);

  if (result)
    return res.status(CREATED).send("Password changed successfully");
  else
    return res.status(NOT_ACCEPTABLE).send("Password refresh failed");

}

export const getUserData = async (req: Request, res: Response, _next: NextFunction) => {
  const accessTokenString = getAccessToken(req.headers.authorization);
  const accessToken = JwtService.verifyToken(accessTokenString, "access");

  if (accessToken === undefined || accessToken.sub === undefined){
    return res.status(NOT_AUTHORIZED).send("Invalid access token");
  }

  const result = await readUserInformation(accessToken.sub);
  if (result) {
    return res.status(SUCCESS).send(result);
  }
  else return res.status(BAD_REQUEST).send("No user available");
}
