export const newBackboneDomain = async () => {
  const self: any = {};

  self.getBackboneUser = async () => {
    return new Promise((resolve, reject) => resolve("hello world express"));
  };

  return self;
};
