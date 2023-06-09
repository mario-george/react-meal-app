import { useContext, useEffect, useState } from 'react';
import ImageHeader from './assets/meals.jpg';
import CartContext from './store/CartContext';
const Header = (props) => {
  const [animate, setAnimate] = useState(false);
  const ctx = useContext(CartContext);
  useEffect(() => {

    setAnimate(true);
    const time = setTimeout(() => setAnimate(false), 300);
    return () => {
      clearTimeout(time);
    };
  }, [ctx.items]);
  const itemsOfCart = ctx.items.reduce((curNumber, element) => {
    return curNumber + element.amount;
  }, 0);
  //reduce method transform an array to a single number it takes the curNumber which gets reavaluated after each element in the return and element of the array and ten it ll return the curNumber and ,0 is the inital value of the curNumber
  return (
    <>
      <div className="top-0 left-0 h-20 w-full flex justify-between z-10 items-center  p-10 position fixed bg-orange-500 font-bold text-xl text-white">
        <div>React Meals </div>
        <button
          onClick={props.onShowCart}
          className={`flex space-x-3 items-center bg-orange-900 rounded-xl px-20 py-3 duration-200 `}>
          <span className="w-10 pt-1 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </span>
          <p> Your Cart</p>

          <span
            className={` border-2 bg-orange-600  border-orange-600 rounded-2xl shadow-xl px-3 pb-1 duration-200 ${animate ? `animate-ping` : `z`}`}>
            {itemsOfCart}
          </span>
        </button>
      </div>
      <div className="overflow-hidden w-[120%] h-[25rem] z-0">
        <img
          src={ImageHeader}
          className="object-cover w-[110%] h-[100%] transform -translate-x-[1rem] -translate-y-[4rem] -rotate-[5deg] "
          alt=""
        />
      </div>
    </>
  );
};
export default Header;
/**
 * translate-y-[1rem] move down the elem 1 rem
 * translate-x-[1rem] move right the elem 1 rem
 * -translate-y-[1rem] move up the elem 1 rem
 * -translate-x-[1rem] move left the elem 1 rem
 * object-fit :cover cover - The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit
 * in order for object-cover to work it needs a container that has width 110% because we shifted it -1 rem and -4 rem
 *overflow-hidden if the content exceeds the height it will hide that extra content
 
 */
