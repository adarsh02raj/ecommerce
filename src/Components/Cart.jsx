import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, setCartQuantity, setUniqueProductCount } from "../features/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const qt = useSelector((state)=>state.cart.cartQuantity)
  const [total, setToatal] = useState(0);
  // Calculate the unique product count
  const dispatch = useDispatch();
  const uniqueProductCount = new Set(cartItems.map(item => item.id)).size;
  console.log(uniqueProductCount);

  useEffect(() => {
    dispatch(setCartQuantity(uniqueProductCount))
    handleTotalPrice();
  }, [cartItems, uniqueProductCount]);
  useEffect(() => {
    dispatch(setUniqueProductCount(uniqueProductCount));
  }, [dispatch, uniqueProductCount, cartItems]);


  const handleTotalPrice = () => {
    let total = 0;
    for (let i in cartItems) {
      total += Number(cartItems[i].price) * Number(cartItems[i].quantity);
    }
    setToatal(total);
  };
  if (!cartItems.length) {
    return (
      <div className="flex justify-center mt-60">
        <div className="flex flex-col gap-5 max-w-fit justify-center">
          <h3>Your shopping cart is empty.</h3>
          <Link
            to={"/"}
            className="border focus:cursor-pointer rounded-lg px-5 py-2 text-center bg-yellow-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  } else
    return (
      <div className="w-[100%] flex flex-col items-center ">
        <div className="head flex justify-between min-w-[60%] max-w-[60%] my-10">
          <h2 className="font-extrabold">Your Cart</h2>
          <Link
            to={"/"}
            className="focus:cursor-pointer rounded-lg underline p-1"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="bodies flex flex-col justify-between min-w-[60%] max-w-[60%] my-10">
          <div className="flex justify-between min-w-[100%] my-10 font-light">
            <div className="flex justify-between w-[60%]">
              <h1>PRODUCT</h1>
            </div>
            <div className="flex justify-between w-[40%]">
              <div>
                <h1>QUANTITY</h1>
              </div>
              <div>
                <h1>TOTAL</h1>
              </div>
            </div>
          </div>
          {cartItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center min-w-[100%] my-10"
              >
                <div className="flex justify-start items-center w-[60%]">
                  <img
                    src={item?.image}
                    alt="null"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      borderRadius: "15px",
                    }}
                  />
                  <div className="pl-5">
                    <h1>{item?.title}</h1>
                    <h1>{item?.price}</h1>
                  </div>
                </div>
                <div className="flex justify-between w-[40%]">
                  <div>
                    <h1>{item?.quantity}</h1>
                  </div>
                  <div>
                    <h1>Rs. {item?.price * item?.quantity}</h1>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="rounded-lg
                  bg-red-700 text-white m-1 px-2
                  hover:bg-red-900 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between w-[60%] mb-10">
          <div>
            Total
          </div>
          <div>
            Rs. {total}
          </div>
        </div>
      </div>
    );
};

export default Cart;
