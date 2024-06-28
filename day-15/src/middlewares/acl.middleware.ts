import { NextFunction, Request, Response } from "express";
import { IReqUser } from "@/utils/interfaces";

export default (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const userRoles = (req as IReqUser).user.roles;

  if (!userRoles || !userRoles.some((userRole) => roles.includes(userRole))) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  next();
};