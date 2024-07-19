import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../config';

const AddItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shop: "",
    image: "",
  });

  async function handleSubmit(e) {
    e.preventDefault(); 

    try {
      const resp = await axios.post(`${baseUrl}/api/items/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Item added:", resp.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Add an item</h1>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Shop</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="shop"
                value={formData.shop}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;









