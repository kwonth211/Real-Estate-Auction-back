import { Request } from "express";
import User from "@/entity/User";

// Todo global root type is not working..-_-
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface RequestCustom extends Request {
  property: string;
}
