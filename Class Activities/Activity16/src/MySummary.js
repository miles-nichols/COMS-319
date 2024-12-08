import React from "react";

function Summary({ dataF, setDataF, setViewer }) {
  const updateHooks = () => {
    setViewer(0);
    setDataF({});
  };

  return (
    <div className="container mt-5">
      <h1>Payment summary:</h1>
      <h3>{dataF.fullName}</h3>
      <p>{dataF.email}</p>
      <p>{dataF.creditCard}</p>
      <p>{dataF.address}</p>
      <p>{dataF.address2}</p>
      <p>{dataF.city}, {dataF.state} {dataF.zip}</p>
      <button onClick={updateHooks} className="btn btn-secondary">Back to Form</button>
    </div>
  );
}

export default Summary;