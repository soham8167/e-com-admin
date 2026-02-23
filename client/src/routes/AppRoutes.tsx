import {Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Veggies from "../pages/Veggies";
import About from "../pages/About";
import Combos from "../pages/Combos";
import Exotic from "../pages/Exotic";
import Fruits from "../pages/Fruits";
import Recipes from "../pages/Recipes";
import Subscriptions from "../pages/Subscriptions";
import Notfound from "../pages/Notfound";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Privacy from "../pages/Privacy";
import Mywallet from "../pages/Mywallet";
import MyWalletOpen from "../pages/MyWalletOpen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/veg" element={<Veggies />} />
      <Route path="/about" element={<About />} />
      <Route path="/combo" element={<Combos />} />
      <Route path="/exotic" element={<Exotic />} />
      <Route path="/fruit" element={<Fruits />} />
      <Route path="/recipe" element={<Recipes />} />
      <Route path="/subscription" element={<Subscriptions />} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/wishlist" element={<Wishlist/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/privacy" element={<Privacy/>} />
      <Route path="/mywallet" element={<Mywallet/>} />
      <Route path="/mywalletopen" element={<MyWalletOpen/>} />
     

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="*" element={<Notfound/>} />
    </Routes>
  );
};

export default AppRoutes;
