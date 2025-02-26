import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { baseUrl } from '../config'
import '../App.css'

export default function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });



    function handleChange(e) {
        const newFormData = structuredClone(formData);
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`${baseUrl}/api/auth/register/`, formData);
            toast.success('Signup successful');
            navigate('/sign-in');

        } catch (err) {
            console.log(err.response.data)
            toast.error('Signup failed');
        }
    }
    return (
        <div className="section">
            <div className="container">
                <h1>Curate your space.</h1>
                <p>Set your interior design vision with the Moodify Spaces moodboard.</p>
            </div>
            <div className="auth-form container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
                    <div className="field">
                        <label className="label" htmlFor="username">Username</label>
                        <div>
                            <input
                                className="input"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div>
                            <input
                                className="input"
                                type="text"
                                name="email"
                                id="email-input"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div>
                            <input
                                className="input"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password_confirmation">Confirm password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                onChange={handleChange}
                                value={formData.password_confirmation}
                            />
                        </div>
                    </div>
                    <button className="button is-success" type="submit">Submit</button>
                </form>
            </div>

        </div>
    );
}