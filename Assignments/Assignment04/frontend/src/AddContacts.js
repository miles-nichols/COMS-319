import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddContact = () => {
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file)); 
    setError(null); 
  };

  const addOneContact = async () => {
    try {
      const formData = new FormData();
      formData.append("contact_name", contactName);
      formData.append("phone_number", phoneNumber);
      formData.append("message", message);
      if (image) formData.append("image", image);

      const response = await fetch("http://localhost:8081/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred.");
        setSuccess(null); 
      } else {
        const successMessage = await response.text();
        setSuccess(successMessage); 
        setError(null); 
        resetForm(); 
      }
    } catch (err) {
      setError("An unexpected error occurred: " + err.message);
      setSuccess(null); 
    }
  };

  const resetForm = () => {
    setContactName("");
    setPhoneNumber("");
    setMessage("");
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Invalid phone number format.");
      return;
    }
    addOneContact();
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(number);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        {/* Error and Success Messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Contact Name */}
        <div className="mb-3">
          <label className="form-label">Contact Name</label>
          <input
            type="text"
            className="form-control"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            maxLength={15} 
          />
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={255}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Contact Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*" 
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
