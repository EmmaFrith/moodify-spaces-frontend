import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from '../config';
import '../App.css'

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const resp = await axios.get(`${baseUrl}/api/items/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = resp.data;
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Your moodboard</h1>
      <div className="moodboard-items">
        {items.map((item, index) => (
          <Link key={index} to={`/items/${item.id}`}>
            <div className="moodboard-item">
              <img src={item.image} />
            </div>
          </Link>
        ))}
      </div>
      <Link to="/add-item">
        <button className="button is-primary">Add an item</button>
      </Link>
    </div>
  );
};

export default Home;