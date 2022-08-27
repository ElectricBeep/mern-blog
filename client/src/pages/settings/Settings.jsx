import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const PF = "https://mernsimpleblog-backend.herokuapp.com/images/";

    const { user, dispatch } = useContext(Context);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username: inputs.username,
            email: inputs.email,
            password: inputs.password
        };
        if (file) { //If there is img for uploading
            const data = new FormData(); //For uploading img
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename; //Adding new img to profile
            try {
                await axios.post("https://mernsimpleblog-backend.herokuapp.com/api/upload", data); //Using multer from index.js to upload
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("https://mernsimpleblog-backend.herokuapp.com/api/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDelete = async () => {
        await axios.post(`https://mernsimpleblog-backend.herokuapp.com/api/users/${user._id}`, {
            userId: user._id
        });
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your account</span>
                    <span
                        className="settingsDeleteTitle"
                        onClick={handleDelete}
                    >
                        Delete account
                    </span>
                </div>
                <form className="settingsForm" onSubmit={handleUpdate}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        {file ? (
                            <img src={URL.createObjectURL(file)} alt="" />
                        ) : (
                            <img
                                src={user?.profilePic ? PF + user.profilePic : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                                alt=""
                            />
                        )}
                        <label htmlFor="fileInput">
                            <i className="fa-regular fa-circle-user settingsPPIcon"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={handleChange}
                        name="username"
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={handleChange}
                        name="email"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success &&
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated!
                        </span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
