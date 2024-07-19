import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from '../config';
import '../App.css'


const EditItem = () => {
    const navigate = useNavigate();
    const { itemId } = useParams()

    const [formData, setFormData] = useState({
        name: "",
        shop: "",
        image: "",
    });

    useEffect(() => {
        async function fetchItem() {
            const token = localStorage.getItem("token");
            const resp = await axios.get(`${baseUrl}/api/items/${itemId}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setFormData(resp.data);
            console.log(resp.data)
            // const data = await resp.json()
            // setFormData(data)
        }
        fetchItem()
    }, [itemId])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const resp = await axios.put(`${baseUrl}/api/items/${itemId}/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Item edited:", resp.data);
            navigate(`/items/${itemId}`);
        } catch (error) {
            console.error("Error editing item:", error);
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
                    <h1>Edit {formData.name}</h1>
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
                            <button type="submit" className="button is-primary submit-button">
                                Edit Item
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItem;