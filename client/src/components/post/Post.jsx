import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
    const PF = "https://mernsimpleblog-backend.herokuapp.com/images/";

    return (
        <div className="post">
            <Link className="link" to={`post/${post._id}`}>
                {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}
                <div className="postInfo">
                    <div className="postCats">{
                        post.categories.map((c, index) => (
                            <span className="postCat" key={index}>
                                {c.name}
                            </span>
                        ))
                    }
                    </div>
                    <span className="postTitle">{post.title}</span>
                    <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                    {/* For formationg reasons we use new Date */}
                </div>
                <span className="postAuthor">By: {post.username}</span>
                <span className="postCategory">
                    {post?.categories ? (
                        "Category: " + post.categories
                    ) : (
                        ""
                    )}
                </span>
            </Link>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}
