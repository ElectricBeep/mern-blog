import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

export default function Home() {
  const [posts, setPosts] = useState([]); //State to get posts
  const [loading, setLoading] = useState(false);

  const { search } = useLocation(); //So we can use req.query.user from posts.js

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://mernsimpleblog-backend.herokuapp.com/api/posts" + search);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt); //Sorts posts by time
        }));
        setLoading(false);
      } catch (err) {
        console.log(err);
      };
    }
    fetchPosts();
  }, [search]);
  //useEffect to get posts

  return (
    <>
      <Header />
      <div className="home">
        {loading ? (
          <Spinner message="Loading posts..." />
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar />
      </div>
    </>
  )
}
