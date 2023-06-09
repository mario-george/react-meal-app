import React from 'react';

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type={props.type}
      min={props.min}
      defaultValue={props.defaultValue}
      max={props.max}
      step={props.step}
      className="text-black focus:outline-none w-[25%] border rounded-md" />
  );
});
export default Input;
//using value in react will make you not able to type in that field use defaultValue instead
