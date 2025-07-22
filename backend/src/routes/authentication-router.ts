import {Router} from 'express';

import {login, changePassword, getUserData, refreshTokenFunction, register} from "@/controllers/authentication";
import {isAuthenticated} from "@/middlewares/authentication";

const authenticationRouter = Router();

authenticationRouter.post("/login", login);
authenticationRouter.post("/register", register);
authenticationRouter.put("/change-password", isAuthenticated, changePassword);
authenticationRouter.get("/my-profile", isAuthenticated, getUserData);
authenticationRouter.post("/refresh", refreshTokenFunction);

export {authenticationRouter};
