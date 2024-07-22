import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../config'
import '../App.css'

export default function Signin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/api/auth/login/`, formData);
            const token = data.token
            console.log(token)
            localStorage.setItem('token', token)
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
            toast.error("Try again - something went wrong.");
        }
    }

    return <div className="section">
        <div className="container">
            <h1>Curate your space.</h1>
            <p>Set your interior design vision with the Moodify Spaces moodboard.</p>
        </div>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button className="button is-success">Submit</button>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
        </div>
    </div>
}