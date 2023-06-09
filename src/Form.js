import Input from "./Input";
import { useContext, useRef } from "react";
import { useState } from "react";
import CartContext from "./store/CartContext";
import { useEffect } from "react";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];
const MealItem = (props) => {
  const [amountIsValid, setAmountisValid] = useState(true);
  const InputRef = useRef();

  const price = `$${props.price.toFixed(2)}`;
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(InputRef.current, "curent");
    const enteredAmount = +InputRef.current.value;
    if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setAmountisValid(false);
      return;
      //wont continue the exec of the submitHandler
    }
    console.log(enteredAmount);
    props.onAddItemToCart(enteredAmount, {
      key: props.id,
      name: props.name,
      price: props.price,
      id: props.id,
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <div className="flex space-y-3 flex-col">
            <p className="font-bold text-black">{props.name}</p>
            <p className="text-black">{props.description}</p>
            <p className="text-orange-500 ">{price}</p>
          </div>
          <div className="flex flex-col space-y-5 w-32">
            <div className="flex justify-around">
              <p className="text-black">Amount</p>
              <Input
                ref={InputRef}
                type="number"
                min="1"
                max="5"
                defaultValue="1"
                step="1"
              />
            </div>
            <button
              type="submit"
              className="py-1 font-bold bg-orange-700 rounded-xl text-white"
            >
              + Add
            </button>
            {!amountIsValid && (
              <p>Please Enter a Valid Amount from 1 to 5 . </p>
            )}
          </div>
        </div>
        <div className=" bg-black h-[0.5px] opacity-10"></div>
      </div>
    </form>
  );
};
export default function Form(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState();
  //null or empty
  useEffect(() => {
    //you cant make async in useEffect thats a rule create an async fn instead
    const fetchHandler = async () => {
      const response = await fetch(
        "https://react-http-b8d82-default-rtdb.firebaseio.com/meals.json",
        {
          headers:{

            Authentication: 'Bearer' + "QbKC2DyPc5Oy6wwQFG67IrZgf0e2",
          }
        }
      );

      const data = await response.json();
      const loadedMeals = [];
      for (let key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setAvailbleMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchHandler().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);
  const [availbleMeals, setAvailbleMeals] = useState([]);
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (amount, item) => {
    cartCtx.addItem({ ...item, amount: amount });
  };

  const items = availbleMeals.map((meal) => {
    return (
      <MealItem
        onAddItemToCart={addItemToCartHandler}
        name={meal.name}
        id={meal.id}
        key={meal.id}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <>
      <div className="mt-8 bg-white w-[70%] text-white mx-auto rounded-2xl shadow-2xl px-4 py-3">
        {error && (
          <p className="text-center font-bold text-3xl text-red-900">{error}</p>
        )}
        {isLoading && (
          <p className="text-center font-bold text-3xl text-black">
            Loading ...{" "}
          </p>
        )}
        {!isLoading && !error}&& {items}
      </div>
    </>
  );
}
