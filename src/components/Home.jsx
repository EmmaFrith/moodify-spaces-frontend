import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from '../config';

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
    <div className="section">
      <div className="columns is-multiline is-mobile">
        {items.map((item, index) => (
          <Link key={index} to={`/items/${item.id}`}>
            <div >
              <img src={item.image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;