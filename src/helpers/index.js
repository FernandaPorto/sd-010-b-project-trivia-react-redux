// devTools
export const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__();
/* (👉️código para configurar a extensão do redux devtools) */

export const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

export const readCart = () => JSON.parse(localStorage.getItem('cart'));

// export default devTools;
