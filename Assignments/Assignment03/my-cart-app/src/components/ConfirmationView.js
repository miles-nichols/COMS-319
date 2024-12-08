import React from "react";

const ConfirmationView = ({ setView, cart, userInfo }) => {
  const total = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="container">
      <h1>Order Confirmation</h1>
      <p>Thank you, {userInfo.fullName}, for your purchase!</p>
      <p>Total amount: ${total.toFixed(2)}</p>
      <p>Your order will be shipped to:</p>
      <p>{userInfo.address1}, {userInfo.city}, {userInfo.state} {userInfo.zip}</p>
      <p>A receipt has been sent to: {userInfo.email}</p>
      <button onClick={() => setView("browse")} className="btn btn-primary mt-3">Return to Shop</button>
    </div>
  );
};

export default ConfirmationView;
