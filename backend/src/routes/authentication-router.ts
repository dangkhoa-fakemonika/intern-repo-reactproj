import {Router} from 'express';

import {login, changePassword, getUserData, refreshTokenFunction, register} from "@/controllers/authentication";

const authenticationRouter = Router();

authenticationRouter.post("/login", login);
authenticationRouter.post("/register", register);
authenticationRouter.put("/change-password", changePassword);
authenticationRouter.get("/my-profile", getUserData);
authenticationRouter.post("/refresh", refreshTokenFunction);

export {authenticationRouter};
