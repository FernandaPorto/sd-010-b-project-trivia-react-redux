import md5 from 'crypto-js/md5';

function fetchGravatarImage() {
  const userEmail = localStorage.getItem('email');
  const emailHash = md5(userEmail).toString();
  return `https://www.gravatar.com/avatar/${emailHash}`;
}

export default fetchGravatarImage;
