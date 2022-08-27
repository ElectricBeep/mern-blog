import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("https://mernsimpleblog-backend.herokuapp.com/api/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login"); //Redirects after registration
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username..."
                    className="registerInput"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email..."
                    className="registerInput"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    minLength="6"
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password..."
                    className="registerInput"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="4"
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
        </div>
    )
}
