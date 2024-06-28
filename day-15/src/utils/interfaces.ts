import { Request } from "express";

export interface IReqUser extends Request {
  user: {
    roles: string[],
    id: string,
  };
}