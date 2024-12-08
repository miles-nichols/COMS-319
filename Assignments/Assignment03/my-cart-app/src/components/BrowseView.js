import React, { useState } from "react";
import products from "../products.json";

const BrowseView = ({ setView, cart, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = (product) => addToCart(product, 1);
  const handleSubtract = (product) => addToCart(product, -1);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Browse Products</h1>
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>${product.price}</p>
                <button onClick={() => handleSubtract(product)} className="btn btn-danger">-</button>
                <span> {cart[product.id]?.quantity || 0} </span>
                <button onClick={() => handleAdd(product)} className="btn btn-success">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setView("cart")} className="btn btn-primary mt-3">Checkout</button>
    </div>
  );
};

export default BrowseView;
