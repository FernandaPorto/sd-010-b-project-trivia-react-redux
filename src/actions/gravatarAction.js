import md5 from 'crypto-js/md5';

import { ACTION_URL } from './index';

const gravatarUrl = (url, name, email) => ({
  type: ACTION_URL,
  payload: {
    url,
    name,
    email,
  },
});

export default function fetchToken(name, email) {
  return (dispatch) => {
    const cryptEmail = md5(email).toString;
    return fetch(`https://www.gravatar.com/avatar/${cryptEmail}`)
      .then((response) => dispatch(gravatarUrl(response.url, name, email)));
  };
}
