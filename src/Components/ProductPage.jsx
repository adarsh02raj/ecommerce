import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShimmerUi from "./ShimmerUi";
import "../styles/productpage.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, checkOut, setUniqueProductCount } from "../features/cartSlice";
import PopUp from "./PopUp";
import '../styles/popup.css'

const ProductPage = () => {
  const { state } = useLocation();
  const item = state?.item || {};
  const [Quantity, setQuantity] = useState(1);

  const defaultValues = Object.fromEntries(
    item.options.map(({ name, values }) => [name, values[0]])
  );
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);
  const [price, setPrice] = useState(item?.variants[0]?.price);
  const formattedOptions = Object.values(selectedOptions).join(" / ");
  const uniqueProductCount = useSelector((state) => state.cart.uniqueProductCount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
    
  const handleAddToCart = () => {
    const productDetails = {
      id: item?.id,
      title: item?.title,
      image: item?.image?.src,
      quantity: Quantity,
      options: selectedOptions,
      price: price,
    };
    setQuantity(1)
    const existingProduct = cartItems.find(
      (product) => product.id === item?.id
    );
    if (!existingProduct) {
      dispatch(setUniqueProductCount(uniqueProductCount + 1));
    }
    dispatch(addToCart(productDetails));
    // dispatch(setUniqueProductCount(uniqueProductCount+1))
    dispatch(checkOut(true));
  };

  //handle select option
  const handleOptionChange = (event, optionType) => {
    const selectedValue = event.target.value;
    setSelectedOptions({ ...selectedOptions, [optionType]: selectedValue });
  };

  useEffect(() => {
    item.variants.map((variant) => {
      if (variant.title === formattedOptions) {
        setPrice(variant.price);
      }
      return "";
    });
    // eslint-disable-next-line
  }, [selectedOptions, uniqueProductCount]);

  //handle quantity button
  const increment = () => {
    setQuantity(Quantity + 1);
  };

  const decrement = () => {
    if (Quantity > 1) {
      setQuantity(Quantity - 1);
    }
  };

  if (!item) <ShimmerUi></ShimmerUi>;
  else
    return (
      <>
        <div className="flex p-10 mx-10">
          <div className="image-grid pr-10 ">
            {item?.images.map((image, index) => {
              const isFirstImage = index === 0;
              const imageSizeStyle = isFirstImage
                ? { gridColumn: "span 2", gridRow: "span 2" }
                : { gridColumn: "span 1", gridRow: "span 1" };
              return (
                <div
                  id={index}
                  style={imageSizeStyle}
                  key={index}
                  className="image-item"
                >
                  <img
                    src={image?.src}
                    alt={image?.alt}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              );
            })}
          </div>
          <div className="details">
            <div className="title">
              <h1 className="title text-2xl font-bold mb-4">{item?.title}</h1>
            </div>
            <div className="price">
              <p>
                {item?.variants[0]?.compare_at_price && (
                  <span className="line-through mr-1 text-s">
                    Rs. {item?.variants[0]?.compare_at_price}
                  </span>
                )}
                <span> Rs. {price}</span>
              </p>
            </div>
            <div className="options flex flex-col gap-5">
              {item?.options?.map((optionsType, index) => {
                // console.log(optionsType);
                // console.log(optionsType?.label)
                return (
                  <div
                    key={index}
                    id={optionsType?.name}
                    className="flex flex-col"
                  >
                    <label htmlFor={optionsType?.name}>
                      {optionsType?.name}
                    </label>
                    <select
                      className="border border-black outline-none rounded-lg w-52 py-2"
                      id={optionsType?.name}
                      name={optionsType?.name}
                      value={selectedOptions[optionsType?.name] || ""}
                      onChange={(e) => handleOptionChange(e, optionsType?.name)}
                    >
                      {/* <option value={null}> {optionsType?.values[0]}</option> */}
                      {optionsType?.values.map((value, valueIndex) => (
                        <option key={valueIndex} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
            <div className="quantity">
              <div className="my-2">Quantity</div>
              <div className="flex border max-w-fit rounded-lg">
                <button className="px-5 py-3" onClick={decrement}>
                  -
                </button>
                <p className="px-5 py-3">{Quantity}</p>
                <button className="px-5 py-3" onClick={increment}>
                  +
                </button>
              </div>
            </div>
            <div className="buying flex flex-col gap-3 mt-3">
              <button
                className="border border-black rounded-lg w-64 py-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button className="bg-yellow-500 rounded-lg w-64 py-2">
                Buy it now
              </button>
            </div>
            <div
              className="py-5 flex flex-col gap-5"
              dangerouslySetInnerHTML={{ __html: item?.body_html }}
            />
            {/* position of this PopUp always float over the above element below the navbar in right top corner */}
            <PopUp className="" data={Quantity}/>
          </div>
        </div>
      </>
    );
};

export default ProductPage;
