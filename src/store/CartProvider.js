import { useReducer } from 'react';
import CartContext from './CartContext';
const cartReducer = (state, action) => {
  if(action.type==='ADD'){
let existingCartItemIndex=state.items.findIndex(item=>item.id===action.item.id)
console.log(action.item.id)
console.log(existingCartItemIndex)
//search each item and if it returned true it will find index
let existingCartItem=state.items[existingCartItemIndex]

if(existingCartItem){
  let updatedItem=state.items[existingCartItemIndex]
  updatedItem.amount+=action.item.amount
  let updatedItems=[...state.items]
  updatedItems[existingCartItemIndex]=updatedItem
  const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount
  //concat is a method like push adds item to an array put it doesnt edit the old array in the memory which is better but creates another one 
  return {totalAmount:updatedTotalAmount,items:updatedItems}  
}
else{
  const updatedItems=state.items.concat(action.item)
  const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount
  //concat is a method like push adds item to an array put it doesnt edit the old array in the memory which is better but creates another one 
  return {totalAmount:updatedTotalAmount,items:updatedItems}  
}

}
  if(action.type==='REMOVE'){
    let existingCartItemToRemoveIndex=state.items.findIndex(item=>item.id===action.id)
    let existingCartItemToRemove=state.items[existingCartItemToRemoveIndex]
    let updatedTotalAmount=state.totalAmount-existingCartItemToRemove.price
    let updatedItems
    if(existingCartItemToRemove.amount===1){
       updatedItems=state.items.filter((item)=>item.id!==action.id)
    }
    else{
       updatedItems=[...state.items]
      updatedItems[existingCartItemToRemoveIndex].amount=existingCartItemToRemove.amount-1
    }
    return {totalAmount:updatedTotalAmount,items:updatedItems}
   
  }
  return defaultCartState;
};
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//useReducer is similar to useState but for more complex login like dispatching for each type like type input update the input field  and type blue check for validation
//state in the reducer function is the latest snapshot of the state and you need to return all the values in the reducer fn in the on the obj you set aS INital value
//action isthe dispatch funtction you will init and you need to return a new state
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
