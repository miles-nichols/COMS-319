import React, { useState } from "react";

const CartView = ({ setView, cart, setCart, updateUserInfo }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    card: "",
    address1: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateUserInfo(form);
      setView("confirmation");
    }
  };

  const validateForm = () => {
    // Simple validation logic here
    return form.fullName && form.email && form.card && form.address1 && form.city && form.state && form.zip;
  };

  const total = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {Object.values(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {Object.values(cart).map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
            <input type="text" name="card" placeholder="Card" value={form.card} onChange={handleInputChange} required />
            <input type="text" name="address1" placeholder="Address 1" value={form.address1} onChange={handleInputChange} required />
            <input type="text" name="city" placeholder="City" value={form.city} onChange={handleInputChange} required />
            <input type="text" name="state" placeholder="State" value={form.state} onChange={handleInputChange} required />
            <input type="text" name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleInputChange} required />
            <button type="submit" className="btn btn-success">Order</button>
          </form>
        </div>
      )}
      <button onClick={() => setView("browse")} className="btn btn-secondary mt-3">Return</button>
    </div>
  );
};

export default CartView;
