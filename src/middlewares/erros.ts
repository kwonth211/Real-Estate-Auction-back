const DEBUG = process.env.DEBUG;

export function newErrorMiddleware() {
  //   if (!sentry) {
  //     throw new Error(errors.internal('invalid parameter error: newErrorMeddleware()'));
  //   }
  return async (ctx, next) => {
    try {
      await next();
    } catch (sourceError) {
      if (DEBUG) {
        console.error(sourceError);
      }

      try {
        const decoded = JSON.parse(sourceError.message);
        const { statusCode } = decoded;
        ctx.status = statusCode;
        ctx.body = {
          status: "error",
          message: decoded && decoded.message ? decoded.message : "",
          error: {
            ...decoded,
          },
        };

        // report to sentry
        if (statusCode === 500) {
          //   sentry.captureException(sourceError);
        }
      } catch (parseError) {
        // sentry.captureException(sourceError);

        ctx.status = 500;
        ctx.body = {
          status: "error",
          message: "처리되지 않은 오류 입니다.",
          error: {
            statusCode: 500,
            hint: sourceError,
          },
        };
      }
    }
  };
}
