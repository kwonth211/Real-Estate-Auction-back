import { Router, Request, Response, NextFunction } from "express";

const route = Router();
const user = (app: Router) => {
  app.use("/notice", route);

  const findNotice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send({ noticeId: 10 });
  };
  route.get("/findnotice", findNotice);

  const deleteNotice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("updateComplete");
  };

  route.put("/updatenotice", deleteNotice);
};
export default user;
