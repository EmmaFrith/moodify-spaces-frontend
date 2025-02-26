import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { Link } from "react-router-dom";
import '../App.css'

const ItemDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate()

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
            }
        }
        fetchItem();
    }, [id]);


    async function handleDelete() {
        try {
            const token = localStorage.getItem('token')

            await axios.delete(`${baseUrl}/api/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            navigate('/')
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    return (
        <div>
            {item && (
                <div>
                    <h1>{item.name}</h1>
                    <h2>{item.shop}</h2>
                    <div className="moodboard-item">
                        <img src={item.image} alt={item.title} />
                        <div className="container">
                            <Link to={`/edit-item/${id}`}>
                                <button className="button">Edit item</button>
                            </Link>
                            {<button className="button is-danger" onClick={handleDelete}>Delete item</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetail;