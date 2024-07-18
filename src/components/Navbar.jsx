import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'


function Navbar() {
    const navigate = useNavigate()

    let location = useLocation()

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("token"));
    }, [location]);

    function logout() {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        navigate('/sign-in')
    }

    return (
        <nav className="navbar">
            <div className="navbar-menu is-active">
                <Link to="/"><div className="logo"></div></Link>
                <div className="navbar-item">
                    <div className="buttons">
                        {isLoggedIn && <Link to="/" className="button is-warning">Your moodboard</Link>}
                        {!isLoggedIn && <Link to="/sign-up" className="button is-warning">Sign up</Link>}
                        {!isLoggedIn && <Link to="/sign-in" className="button is-success">Sign in</Link>}
                        {isLoggedIn && <button className="button" onClick={logout}>Sign out</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar