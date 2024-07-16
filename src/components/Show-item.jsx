import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from '../config';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const resp = await axios.get(`${baseUrl}/api/items/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = resp.data;
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
        // Optionally handle error state here
      }
    }
    fetchItem();
  }, [id]); // Fetch item details when ID changes

  // Render only if item is fetched and not null
  return (
    <div>
      {item && (
        <div>
          <h1>{item.name}</h1>
          <div>
            <img src={item.image} alt={item.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;