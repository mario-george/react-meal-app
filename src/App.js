import { useState } from 'react';
import Form from './Form';
import Header from './Header';
import Message from './Message';
import Modal from './Modal';
import CartProvider from './store/CartProvider';
/**
 *
 * template literal ``
 * ${} dolar sign {} is to inject dynamic content .toFixed(2) only render 2 decimal places
 *
 */

export default function App() {
  const ShowCartHandler = () => {
    setShowCart(true);
  };
  const closeModalHandler = () => {
    setShowCart(false);
  };

  const [showCart, setShowCart] = useState(false);
  return (
    <CartProvider>
      <Header onShowCart={ShowCartHandler} />
      {showCart && <Modal onCloseCart={closeModalHandler} />}
      <Message></Message>
      <Form ></Form>
    </CartProvider>
  );
}
