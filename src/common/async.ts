const wrapAsync = (fn) => async (req, res, next) =>
  await fn(req, res, next).catch(next);
export default wrapAsync;
