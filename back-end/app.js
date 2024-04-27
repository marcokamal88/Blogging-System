const express = require("express");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users, sequelize, posts, UserSavedPost } = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());
console.log(typeof process.env.SALT);
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let mypassword = password;
    let userFound = await users.findOne({
      where: {
        email,
      },
    });
    if (userFound) {
      return res.status(409).send("user already exists :)");
    } else {
      try {
        console.log(typeof salt);
        const password = await bcrypt.hash(mypassword, +process.env.SALT);
        await users.create({ name, email, password, role });
        return res.status(200).send("user registered successfully");
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userFound = await users.findOne({ where: { email } });
    // res.send(userFound);
    if (userFound) {
      const passwordMatch = await bcrypt.compare(password, userFound.password);
      if (!passwordMatch) {
        return res.status(401).send("wrong password :(");
      }
      const token = jwt.sign(
        {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send(token);
    } else {
      res.status(404).send("user is not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/show_all_users", async (req, res) => {
  const query = req.query;
  limit = query.limit || 10;
  page = query.page || 1;
  offset = (page - 1) * limit;
  try {
    const myusers = await users.findAll({ limit, offset });

    return res.json(myusers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/show_users/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const myusers = await users.findOne({
      where: { id },
      include: "posts",
    });
    return res.json(myusers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create_posts", verifyToken, async (req, res) => {
  const { title, cover_image, summary, multiple_categories, content, userId } =
    req.body;
  try {
    const myuser = await users.findOne({ where: { id: userId } });
    console.log(userId);
    if (myuser.role != "author") {
      return res.status(401).send("you r not authorized to publish a post");
    }
    const post = await posts.create({
      title,
      cover_image,
      summary,
      multiple_categories,
      content,
      userId: myuser.id,
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// get posts
app.get("/timeline", verifyToken, async (req, res) => {
  const query = req.query;
  limit = query.limit || 5;
  page = query.page || 1;
  offset = (page - 1) * limit;
  try {
    const myposts = await posts.findAll({ include: "users", limit, offset });
    return res.json(myposts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/delete_posts/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = posts.destroy({ where: { id } });

    return res.status(200).send("user deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/update_posts/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = posts.findOne({ where: { id } });
    if (!post) {
      return res.status(404).send("post not found");
    }
    const {
      title,
      cover_image,
      summary,
      multiple_categories,
      content,
      userId,
    } = req.body;

    await posts.update(
      {
        title,
        cover_image,
        summary,
        multiple_categories,
        content,
        userId,
      },
      { where: { id } }
    );
    return res.status(200).send("post updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/save_posts/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    const user = await users.findByPk(res.id);
    console.log("post id : " + id);
    console.log("user id : " + res.id);
    if (user && post) {
      await user.addSavedPost(post);
      return res.status(200).send("post saved successfully");
    } else return res.status(404).send("user or post is not found");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/saved-posts", verifyToken, async (req, res) => {
  try {
    const userId = res.id;
    const savedPostIds = await UserSavedPost.findAll({
      where: {
        userId,
      },
      attributes: ["postId"],
    });
    if (savedPostIds) {
      const postIds = savedPostIds.map((savedPost) => savedPost.postId);
      const savedPosts = await posts.findAll({
        where: {
          id: postIds,
        },
      });
      return res.status(200).send(savedPosts);
    } else return res.status(404).send("post is not found");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/delete-saved-posts/:id", verifyToken, async (req, res) => {
  try {
    const sevedPostId = req.params.id;
    const sevedPost = UserSavedPost.destroy({ where: { id: sevedPostId } });
    return res.status(200).send("user deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send("there is some error :(");
      res.id = user.id;
      next();
    });
  } else {
    return res.status(403).send("cannot find token in header :(");
  }
}

app.listen({ port: process.env.PORT }, async () => {
  console.log("Server up on http://localhost:" + process.env.PORT);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
