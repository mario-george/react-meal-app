import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import CartCheckout from './CartCheckout';
import CartContext from './store/CartContext';
const BackDrop = (props) => {
  return (
    <div className="top-0 fixed left-0 w-full h-[100vw] bg-black opacity-50 z-30 overflow-hidden " />
  );
};


const ModalOverlay = (props) => {
  const cancelCheckoutHandler = ()=>{
    props.onCloseCart()
  }
  const [isCheckout,setIsCheckout]=useState(false)
  const checkoutHandler= ()=>{
    setIsCheckout(true)
  }
  const cartCtx = useContext(CartContext);
  const confimCheckoutHandler=userInfo=>{
    fetch('https://react-http-b8d82-default-rtdb.firebaseio.com/orders.json',{method:'POST',
    body:
    JSON.stringify({userInfo:userInfo,orderedItems:cartCtx.items})
    ,headers:{'Content-type':'application/json'}
  
  
  })
  }
  return (
    <div className="fixed w-full h-[100vw] justify-center items-center  z-40 mx-auto translate-x-[25rem] translate-y-[10rem] overflow-hidden">
      <div className="flex flex-col gap-5 rounded-lg    bg-white  w-[50%] p-5  text-black">
        <div className="flex flex-row justify-start">
          {props.items.length ? (
            <div className="text-xl  w-full  overflow-x-hidden ">
              {props.items.map((item) => {
                const forwardItemToInc = (item) => {
                  // props.onIncCartItem(item)
                  cartCtx.addItem({ ...item, amount: 1 });
                };
                const forwardItemToDec = (id) => {
                  // props.onDecCartItem(item)
                  cartCtx.removeItem(id);
                };

                return (
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 flex-col">
                        <div className="font-bold text-2xl">{item.name}</div>
                        <div className="flex flex-row gap-6">
                          <div className="text-md font-bold  text-orange-500">
                            ${item.price}
                          </div>
                          <div className="text-md font-bold border rounded-lg px-2 ">
                            x{item.amount}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6">
                        {' '}
                        <button
                          onClick={forwardItemToDec.bind(null, item.id)}
                          className="text-3xl hover:text-white  font-bold border-2 border-orange-500 rounded-lg px-8 py-1 bg-white text-orange-500 hover:bg-orange-600 hover:border-orange-600">
                          -
                        </button>
                        <button
                          onClick={forwardItemToInc.bind(null, item)}
                          className="text-3xl hover:text-white font-bold border-2 border-orange-500 rounded-lg px-8 py-1 bg-white text-orange-500 hover:bg-orange-600 hover:border-orange-600 ">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="bg-orange-500 opacity-50 h-1"></div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">Total Amount</p>
          <p className="font-bold text-2xl">{props.totalAmount.toFixed(2)}$</p>
        </div>
        {isCheckout && <CartCheckout onConfirm={confimCheckoutHandler} onCancel={cancelCheckoutHandler} />}
        { !isCheckout && <div className="flex justify-end gap-5">
           <button
            className="border-2 border-orange-500 bg-white px-5 py-1 text-orange-500 rounded-2xl"
            onClick={props.onCloseCart}>
            Close
          </button>
          <button onClick={checkoutHandler} className="bg-orange-500 px-5 py-1 text-white rounded-2xl">
            Order
          </button>
        </div>}
      </div>
    </div>
  );
};

export default function Modal(props) {
  const el = document.getElementById('modal');
  const cartCtx = useContext(CartContext);
  const IncCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const DecCartItemHandler = (item) => {
    cartCtx.removeItem(item.id);
  };
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, document.getElementById('modal'))}
      {ReactDOM.createPortal(
        <ModalOverlay
          items={cartCtx.items}
          totalAmount={cartCtx.totalAmount}
          onCloseCart={props.onCloseCart}
          onIncCartItem={IncCartItemHandler}
          onDecCartItem={DecCartItemHandler}
        />,
        document.getElementById('modal')
      )}
    </>
  );
}
