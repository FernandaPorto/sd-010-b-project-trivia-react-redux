// devTools
export const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__();
/* (👉️código para configurar a extensão do redux devtools) */

export const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

export const readCart = () => JSON.parse(localStorage.getItem('cart'));

// export default devTools;

API de Trivia
A API do Trivia é bem simples. Temos 2 endpoints que vamos precisar utilizar para esse exercício.

Pegar o token de sessão da pessoa que está jogando
Pegar perguntas e respostas
Primeiro, é necessário fazer um GET request para:

https://opentdb.com/api_token.php?command=request
Esse endpoint te retornará o token que vai ser utilizado nas requisições seguintes. A resposta dele será:

{
   "response_code":0,
   "response_message":"Token Generated Successfully!",
   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
Paga pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
Recomendamos pedir 5 perguntas de uma vez e controlar a disposição delas no código. Essa API te retorna as perguntas no seguinte formato:

// Pergunta de múltipla escolha
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"multiple",
         "difficulty":"easy",
         "question":"What is the first weapon you acquire in Half-Life?",
         "correct_answer":"A crowbar",
         "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
         ]
      }
   ]
}
// Pergunta de verdadeiro ou falso
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"boolean",
         "difficulty":"hard",
         "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
         "correct_answer":"False",
         "incorrect_answers":[
            "True"
         ]
      }
   ]
}
O token expira em 6 horas e te retornará um response_code: 3 caso esteja expirado. Atenção para que seu código contemple isso! Caso o token seja inválido, essa será a resposta da API:

{
   "response_code":3,
   "results":[]
}

