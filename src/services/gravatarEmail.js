import CryptoJS from 'crypto-js';

const getGravatarImg = (email) => {
  const hash = CryptoJS.MD5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default getGravatarImg;
