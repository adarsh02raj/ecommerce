import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/popup.css";
import { Link } from "react-router-dom";
import { setCartQuantity } from "../features/cartSlice";

const PopUp = (props) => {
  const checkoutItems = useSelector((state) => state.cart.items);
  const updateCartQuantitys = useSelector(state => state.cart.updateQ)
  const lenght = checkoutItems.length - 1;
  const [status, setstatus] = useState(true)
  const [cartQ, setCartQ] = useState(0)
  const handleClose = () =>{
    setstatus(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    handleQuantityInCart()
  }, [lenght, checkoutItems, props.data, status, updateCartQuantitys]);
  const handleQuantityInCart = () => {
    let totalQuantity = 0;
  
    checkoutItems.forEach(item => {
      totalQuantity += parseInt(item.quantity);
    });
    dispatch(setCartQuantity(totalQuantity))
    setCartQ(totalQuantity);
  };
  
  if (lenght>=0 && status)
    return (
      <div className="popup w-64 rounded-lg">
        <div className="top flex justify-between">
          <p>
            <span className="">✔️</span> Item added to your cart
          </p>
          <button onClick={handleClose}>❌</button>
        </div>
        <div className="center flex justify-start">
          <div className="images">
            <img
              src={checkoutItems[lenght].image}
              alt=""
              style={{
                width: "70px",
                aspectRatio: "auto 70 / 99",
                height: "99px",
              }}
              className="rounded-lg p-1 m-1"
            />
          </div>
          <div className="details flex items-center">
            <div className="title">
              <h4>{checkoutItems[lenght].title}</h4>
              {Object.entries(checkoutItems[lenght].options).map(
                ([key, value], index) => (
                  <div key={index} className="flex">
                    <p>{key}:</p>
                    <p className="ml-1">{value}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="viewCart flex items-center justify-center bg-white border-2 border-black rounded-lg p-2">
            <Link to={'/cart'}>
              <button>View Cart ( {cartQ} )</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default PopUp;
