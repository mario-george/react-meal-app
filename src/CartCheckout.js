import { useRef, useState } from 'react';

const CartCheckout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    nameIsValid: true,
    streetIsValid: true,
    cityIsValid: true,
    postalCodeIsValid: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;
    const postalCode = postalCodeRef.current.value;

    let nameIsValid = nameRef.current.value.trim() !== '';
    let streetIsValid = streetRef.current.value.trim() !== '';
    let cityIsValid = cityRef.current.value.trim() !== '';
    let postalCodeIsValid = postalCodeRef.current.value.trim().length === 5;

    setFormIsValid({
      nameIsValid,
      streetIsValid,
      cityIsValid,
      postalCodeIsValid,
    });
    let formIsValid = false;
    formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;
    if (!formIsValid) {
      return;
      //wont complete the execution of the functon

    }

    if (formIsValid) {
      props.onConfirm({
        name,
        street,
        city,
        postalCode,
      });
    }
  };

  const nameInputNotValid = `${!formIsValid.nameIsValid ? 'invalid' : ''}`;
  const cityInputNotValid = `${!formIsValid.cityIsValid ? 'invalid' : ''}`;
  const streetInputNotValid = `${!formIsValid.streetIsValid ? 'invalid' : ''}`;
  const postalCodeInputNotValid = `${
    !formIsValid.postalCodeIsValid ? 'invalid' : ''
  }`;
  return (
    <form
      id="checkout"
      className="flex flex-col gap-5 "
      onSubmit={submitHandler}>
        <div className="overflow-y-scroll">


      <label htmlFor="name">Name</label>
      <input
        ref={nameRef}
        type="text"
        id="name"
        className={nameInputNotValid}
      />
      {!formIsValid.nameIsValid && <p>Please Enter a non-empty name</p>}

      <label htmlFor="street">Street</label>
      <input
        ref={streetRef}
        type="text"
        id="street"
        className={streetInputNotValid}
      />
      {!formIsValid.streetIsValid && <p>Please Enter a non-empty street</p>}
      <label htmlFor="postalCode">Postal Code</label>
      <input
        ref={postalCodeRef}
        type="text"
        id="postalCode"
        className={postalCodeInputNotValid}
      />
      {!formIsValid.postalCodeIsValid && (
        <p>Please Enter a valid postal code of 5 numbers</p>
      )}
      <label htmlFor="city">City</label>
      <input
        ref={cityRef}
        type="text"
        id="city"
        className={cityInputNotValid}
      />
      {!formIsValid.cityIsValid && <p>Please Enter a non-empty city</p>}
        </div>
      <div className="flex gap-8 justify-end">
        <button
          className=" border border-orange-500 bg-orange-500 font-bold text-center hover:text-white hover:bg-orange-700 duration-200 rounded-2xl px-8 py-2"
          type="button"
          onClick={props.onCancel}>
          Cancel
        </button>
        <button className=" border border-orange-500 bg-white font-bold text-center hover:text-white hover:bg-orange-700 duration-200 rounded-2xl px-8 py-2">
          Confirm
        </button>
        {/* button with type button wont submit the form */}
      </div>
    </form>
  );
};
export default CartCheckout;
