import "./singlePost.css";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const [post, setPost] = useState({});
    const [title, setTitle] = useState(""); //For editing post
    const [desc, setDesc] = useState(""); //For editing post
    const [updateMode, setUpdateMode] = useState(false); //For editing post

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    //So we don't have to get data from api with state and effect like in home page, we can
    //use this above method

    const PF = "https://mernsimpleblog-backend.herokuapp.com/images/";

    const { user } = useContext(Context);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("https://mernsimpleblog-backend.herokuapp.com/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("https://mernsimpleblog-backend.herokuapp.com/api/posts/" + path, {
                data: { username: user.username }
            });
            //To delete post we have to indicate username, that's how I setup in postman
            //Also I had to put data: infont of user declaration for it to work
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        };
    };

    const handleUpdate = async () => {
        try {
            await axios.put("https://mernsimpleblog-backend.herokuapp.com/api/posts/" + path, {
                username: user.username,
                title: title,
                desc: desc
            });
            //To update, this time time we had to remove data:
            window.location.reload();
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}{
                    updateMode ? (
                        <input
                            type="text"
                            maxLength="40"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {post.title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <i
                                        className="fa-solid fa-pen-to-square singlePostEditIcon"
                                        onClick={() => setUpdateMode(true)}
                                    >
                                        <span className="singlePostEditText">
                                            Edit
                                        </span>
                                    </i>
                                    <i
                                        className="fa-solid fa-trash-can singlePostDeleteIcon"
                                        onClick={handleDelete}
                                    >
                                        <span className="singlePostDeleteText">
                                            Delete
                                        </span>
                                    </i>
                                </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <span className="singlePostAuthorName"><b> {post.username}</b></span>
                        </Link>
                    </span>
                    <span className="singlePostCategory">
                        {post?.categories ? (
                            "Category: " + post.categories
                        ) : (
                            ""
                        )}
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {
                    updateMode ? (
                        <textarea
                            maxLength="1500"
                            value={desc}
                            className="singlePostDescInput"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    ) : (
                        <p className="singlePostDesc">
                            {desc}
                        </p>
                    )
                }{
                    updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    )
                }
            </div>
        </div >
    )
}
