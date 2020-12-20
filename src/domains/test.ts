interface testDomain {
  updateTestUser?: string;
}

export const newTestDomain = async () => {
  const self: testDomain = {};

  self.updateTestUser = async () => {
    const a = await new Promise<string>((resolve, reject) => {
      resolve("update complete");
    });
    return a;
  };

  return self;
};
