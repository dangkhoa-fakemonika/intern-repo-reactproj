import {Router} from 'express';

import {
  login,
  changePassword,
  getUserData,
  refreshTokenFunction,
  register,
  updateUserData
} from "@/controllers/authentication";
import {isAuthenticated} from "@/middlewares/authentication";

const authenticationRouter = Router();

authenticationRouter.post("/login", login);
authenticationRouter.post("/register", register);
authenticationRouter.put("/change-password", isAuthenticated, changePassword);
authenticationRouter.get("/my-profile", isAuthenticated, getUserData);
authenticationRouter.put("/my-profile", isAuthenticated, updateUserData)
authenticationRouter.post("/refresh", refreshTokenFunction);

export {authenticationRouter};
