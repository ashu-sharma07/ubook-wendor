import NodeCache from "node-cache";

const verificationCodeCache = new NodeCache({ stdTTL: 300 }); // TTL of 5 minutes

export const setVerificationCode = (userId, code) => {
  verificationCodeCache.set(userId, code);
};

export const getVerificationCode = (userId) => {
  return verificationCodeCache.get(userId);
};

export const deleteVerificationCode = (userId) => {
  verificationCodeCache.del(userId);
};

const homePageCache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes

export const getHomePageCache = (key) => {
  return homePageCache.get(key);
};

export const setHomePageCache = (key, value) => {
  homePageCache.set(key, value);
};

export const deleteHomePageCache = (key) => {
  homePageCache.del(key);
};
