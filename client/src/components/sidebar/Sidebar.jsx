import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    const PF = "https://mernsimpleblog-backend.herokuapp.com/images/";

    useEffect(() => {
        const getCats = async () => {
            const res = await axios("https://mernsimpleblog-backend.herokuapp.com/api/categories");
            setCats(res.data);
        }
        getCats();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={PF + "person.jpg"} alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque optio eum.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c, index) => (
                        <Link to={`/?cat=${c.name}`} className="link" key={index}>
                            {/* So we can use req.query.cat */}
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="link">
                        <i className="fa-brands fa-facebook-square sidebarIcon"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="link">
                        <i className="fa-brands fa-twitter-square sidebarIcon"></i>
                    </a>
                    <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" className="link">
                        <i className="fa-brands fa-pinterest-square sidebarIcon"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="link">
                        <i className="fa-brands fa-instagram-square sidebarIcon"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
