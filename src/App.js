import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./Components/Product";
import ProductPage from "./Components/ProductPage";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./Components/Cart";
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <NoteState>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:collectionId" element={<Product />} />
          <Route path="/productPage/:id" element={<ProductPage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </NoteState>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
