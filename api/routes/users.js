const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) { //Checking if it's our acc
        if (req.body.password) { //Checking if user is sending password with req
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }); //So we get updated parameters from postman res
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

//Delete user and their posts
router.post("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = User.findById(req.params.id); //Find user for deleting their posts
            try {
                const deletePosts = await Post.deleteMany({ username: user.username }); //We
                //check post username and if it's the same name as the user username, it will 
                //delete it

                const deleteUser = await User.findByIdAndDelete(req.params.id); //Find user
                //so we can delete them
                res.status(200).json("Account and their posts have been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(403).json("You can delete only your account!");
    }
});

//Get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc; //So we don't send back password
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;