import * as api from '../../components/Api';

function actionPergunta(data) {
  return {
    type: 'REQUEST_PERGUNTAS',
    payload: data,
  };
}

export default function fetchPerguntas(token) {
  return (dispatch) => api.getPerguntas(token)
    .then((resp) => dispatch(actionPergunta(resp)));
}
