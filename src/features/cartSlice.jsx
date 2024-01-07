import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    flag: false,
    searchText: '',
    cartQuantity: 0,
    uniqueProductCount: 0,
    render: false,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => 
        item.id === newItem.id &&
        JSON.stringify(item.options) === JSON.stringify(newItem.options)
      );
    
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    checkOut(state) {
      state.flag = !state.flag;
    },
    setSearchTexts(state, action){
      state.searchText=action.payload
    },
    setCartQuantity(state, action){
      state.cartQuantity=action.payload
    },
    updateRender(state, action){
      state.render=action.payload
    },
    setUniqueProductCount(state, action) {
      state.uniqueProductCount = action.payload;
    },

  },
});

export const { addToCart, removeFromCart, checkOut, setSearchTexts, setCartQuantity, updateRender, setUniqueProductCount } = cartSlice.actions;
export default cartSlice.reducer;
