import {client} from "@/controllers/client";
import bcrypt from "bcrypt";
import {userCredentialSchema} from "@/models/user-credentials";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const database = client.db("user");
const user_credentials = database.collection("credentials");

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;


  const schemaResult = userCredentialSchema.validate({email: email, password: password});
  if (schemaResult.error) {
    return res.send(schemaResult.error);
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const result = await user_credentials.insertOne({email: email, password: encryptedPassword});

  return res.status(201).send(result);
}

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (accessTokenSecret === undefined || refreshTokenSecret === undefined) {
    return res.status(410).send("Secret service not available");
  }

  const email = req.body.email;
  const password = req.body.password;

  const storedPassword = await user_credentials.findOne({email: email});

  if (storedPassword === null) {
    return res.status(401).send("No user exist");
  }

  const match = bcrypt.compareSync(password, storedPassword.password);
  if (match) {
    const accessToken = jwt.sign({
    }, accessTokenSecret , {
      header : {
        alg : "HS256",
        typ : "access"
      },
      expiresIn : "1d",
      issuer: "my server",
      audience: "you",
      subject: email
    });
    const refreshToken = jwt.sign({
    }, refreshTokenSecret, {
      header : {
        alg : "HS256",
        typ : "refresh",
      },
      expiresIn : "30d",
      issuer: "my server",
      audience: "you",
      subject: email
    });

    return res.status(201).send({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } else {
    return res.status(401).send("Incorrect credentials");
  }
}

export const refreshTokenFunction = (req: Request, res: Response, _next: NextFunction) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (accessTokenSecret === undefined || refreshTokenSecret === undefined) {
    return res.status(410).send("Secret service not available");
  }

  const refreshToken = req.body.refresh_token;

  if (!jwt.verify(refreshToken, refreshTokenSecret)){
    return res.status(401).send("Invalid token");
  }

  const refreshData = jwtDecode(refreshToken);
  const refreshHeader = jwtDecode(refreshToken, {header : true});

  if (refreshHeader.typ !== "refresh") {
    return res.status(401).send("Invalid token");
  }

  const accessToken = jwt.sign({
  }, accessTokenSecret, {
    header : {
      alg : "HS256",
      typ : "access"
    },
    expiresIn : "1d",
    issuer: "my server",
    audience: "you",
    subject: refreshData.sub,
  });

  return res.status(201).send({
    access_token: accessToken,
    refresh_token: refreshToken
  });

}

export const changePassword = async (req: Request, res: Response, _next: NextFunction) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (accessTokenSecret === undefined || refreshTokenSecret === undefined) {
    return res.status(410).send("Secret service not available");
  }

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader === undefined){
    return res.status(401).send("No authorization");
  }

  const accessTokenHeader = authorizationHeader.match(/^Bearer (\S*\.\S*\.\S*)$/);
  if (accessTokenHeader === null){
    return res.status(401).send("No access token found");
  }
  const accessToken = accessTokenHeader[0];


  if (!jwt.verify(accessToken, accessTokenSecret)){
    return res.status(401).send("Invalid access token");
  }

  const accessData = jwtDecode(accessToken);
  const accessHeader = jwtDecode(accessToken, {header : true});

  if (accessHeader.typ !== "access"){
    return res.status(401).send("Invalid access token");
  }

  const newPassword = req.body.password;

  const userCred = await user_credentials.findOne({user: accessData.sub});
  if (userCred === null){
    return res.status(403).send("No user exists");
  }

  const match = bcrypt.compareSync(newPassword, userCred.password);
  if (match){
    return res.status(405).send("The password is the same");
  }

  const schemaResult = userCredentialSchema.validate({username : userCred.username, password: newPassword});
  if (schemaResult.error){
    return res.status(403).send("Password invalid");
  }

  await user_credentials.updateOne({user: userCred.username}, {password: newPassword});
  return res.status(201).send("Password changed successfully");

}

export const getUserData = (req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send("hello");
}
