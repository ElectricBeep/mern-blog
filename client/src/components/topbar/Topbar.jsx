import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
    const { user, dispatch } = useContext(Context);

    const PF = "https://mernsimpleblog-backend.herokuapp.com/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="top">
            <div className="topLeft">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="link">
                    <i className="fa-brands fa-facebook-square topIcon"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="link">
                    <i className="fa-brands fa-twitter-square topIcon"></i>
                </a>
                <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" className="link">
                    <i className="fa-brands fa-pinterest-square topIcon"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="link">
                    <i className="fa-brands fa-instagram-square topIcon"></i>
                </a>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <Link className="link" to="/">
                        <li className="topListItem">
                            HOME
                        </li>
                    </Link>
                    <Link className="link" to="/about">
                        <li className="topListItem">
                            ABOUT
                        </li>
                    </Link>
                    <Link className="link" to="/contact">
                        <li className="topListItem">
                            CONTACT
                        </li>
                    </Link>
                    <Link className="link" to="/write">
                        <li className="topListItem">
                            WRITE
                        </li>
                    </Link>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings" className="link">
                        <img src={user?.profilePic ? PF + user?.profilePic : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt="" className="topImg" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">LOGIN</Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <i className="fa-solid fa-magnifying-glass topSearchIcon"></i>
            </div>
        </div>
    )
}
