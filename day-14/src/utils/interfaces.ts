import { Request } from "express";

export interface IReqUser extends Request {
  user: {
    role: string,
    id: string,
  };
}