import React from 'react';
import md5 from 'crypto-js/md5';

export function getGravatar(email) {
  const convert = md5(email).toString();
  const endpoint = `https://www.gravatar.com/avatar/${convert}`;
  return endpoint;
}

export function getPerfilGravatar(email, name, score) {
  const endpoint = getGravatar(email);
  return (
    <div>
      <img src={ endpoint } alt={ `foto de ${name}` } />
      <span data-testid="header-player-name">
        {`Bem-vindo ${name}`}
      </span>
      <span data-testid="header-profile-picture">{` Email: ${email}`}</span>
      <span data-testid="header-score">{` Pontuação: ${score}`}</span>
    </div>
  );
}
