import { debug } from "console";
import errors from "@/common/errors";

const DEBUG = process.env.DEBUG;

const ErrorMiddleWare = async (err, req, res, next) => {
  //   if (!sentry) {
  //     throw new Error(errors.internal('invalid parameter error: newErrorMeddleware()'));
  //   }

  try {
    const decoded = JSON.parse(err.message);
    const { statusCode } = decoded;

    res.status(err.status || statusCode);
    res.json({
      status: "error",
      message: decoded && decoded.message ? decoded.message : "",
      error: {
        ...decoded,
      },
    });
  } catch (parseError) {
    res.status(500);
    res.json({
      status: "error",
      message: "처리되지 않은 오류 입니다.",
      error: {
        statusCode: 500,
        hint: err.message,
      },
    });
  }
};

export default ErrorMiddleWare;
