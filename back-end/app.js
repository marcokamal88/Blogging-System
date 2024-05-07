const express = require("express");
require("dotenv").config();
const cors = require("cors");
const usersController = require("./controllers/userController");
const postsController = require("./controllers/postsController");
const MW = require("./middlewares/middleware");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
console.log(typeof process.env.SALT);
app.post("/register", usersController.register);

app.post("/login", usersController.login);

app.get("/show_all_users", usersController.getAllUsers);

app.get("/show_users/:id", MW.verifyToken, usersController.getUser);

app.post("/create_posts", MW.verifyToken, postsController.createPost);

// get posts
app.get("/timeline", MW.verifyToken, postsController.timeline);

app.delete("/delete_posts/:id", MW.verifyToken, postsController.deletePost);

app.put("/update_posts/:id", MW.verifyToken, postsController.updatePost);

app.post("/save_posts/:id", MW.verifyToken, postsController.savePost);

app.get("/saved_posts", MW.verifyToken, postsController.getSavedPosts);

app.delete(
  "/delete_saved_posts/:id",
  MW.verifyToken,
  postsController.deleteSavedPost
);

app.listen({ port: process.env.PORT }, async () => {
  console.log("Server up on http://localhost:" + process.env.PORT);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
