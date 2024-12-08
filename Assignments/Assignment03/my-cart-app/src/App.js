import React, { useState } from "react";
import BrowseView from "./components/BrowseView";
import CartView from "./components/CartView";
import ConfirmationView from "./components/ConfirmationView";

const App = () => {
  const [currentView, setCurrentView] = useState("browse");
  const [cart, setCart] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  const addToCart = (product, quantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [product.id]: { ...product, quantity: (prevCart[product.id]?.quantity || 0) + quantity }
    }));
  };

  const updateUserInfo = (info) => setUserInfo(info);

  return (
    <div>
      {currentView === "browse" && <BrowseView setView={setCurrentView} cart={cart} addToCart={addToCart} />}
      {currentView === "cart" && (
        <CartView setView={setCurrentView} cart={cart} setCart={setCart} updateUserInfo={updateUserInfo} />
      )}
      {currentView === "confirmation" && <ConfirmationView setView={setCurrentView} cart={cart} userInfo={userInfo} />}
    </div>
  );
};

export default App;
