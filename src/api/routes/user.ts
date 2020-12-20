import { Router, Request, Response, NextFunction } from "express";

const route = Router();
const user = (app: Router) => {
  app.use("/user", route);

  const findUser = async (req: Request, res: Response, next: NextFunction) => {
    // const authServiceInstance = Container.get(AuthService);
    // const { user, token } = await authServiceInstance.SignUp(
    //   req.body as IUserInputDTO
    // );
    res.send({ userId: 3 });
    // return res.status(201).json({ user, token });
  };
  route.get("/finduser", findUser);

  const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("updateComplete");
  };

  route.put("/updateuser", updateUser);
};
export default user;
