import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState("");
    const [file, setFile] = useState(null);

    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories
        };
        if (file) { //If there is img for uploading
            const data = new FormData(); //For uploading img
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename; //Adding img to new post
            try {
                await axios.post("https://mernsimpleblog-backend.herokuapp.com/api/upload", data); //Using multer from index.js to upload
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("https://mernsimpleblog-backend.herokuapp.com/api/posts", newPost);
            window.location.replace("/post/" + res.data._id); //After res we send user to
            //single post page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="write">
            {file && <img src={URL.createObjectURL(file)} alt="" className="writeImg" />}
            {/* If there is img we can see it now cuz of URL.createObjectURL */}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput" className="fileInput">
                        <i className="fa-solid fa-plus writeIcon"></i>
                        <span className="fileInputText">Click to Select an Image</span>
                    </label>
                    <div className="writeCategoriSelect">
                        <label className="fileInputCategoryTitle">Select Category</label>
                        <select onChange={(e) => setCategories(e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="Music">Music</option>
                            <option value="Sport">Sport</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Health">Health</option>
                            <option value="Food">Food</option>
                            <option value="DIY">DIY</option>
                        </select>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    //Used to set file for uploading, so we can see it on web page
                    />
                    <input
                        type="text"
                        maxLength="40"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        maxLength="1500"
                        onChange={(e) => setDesc(e.target.value)}
                    >
                    </textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
