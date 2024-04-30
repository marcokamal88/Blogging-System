require("dotenv").config();
const { users, posts, UserSavedPost } = require("../models");

const timeline = async (req, res) => {
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
};

const createPost = async (req, res) => {
  const { title, cover_image, summary, multiple_categories, content, userId } =
    req.body;
  try {
    const myuser = await users.findOne({ where: { id: userId } });
    console.log(userId);
    if (myuser.role != "author") {
      return res
        .status(401)
        .json({ error: "you r not authorized to publish a post" });
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
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await posts.destroy({ where: { id } });
    return res.status(200).json("post deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = posts.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ error: "post not found" });
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
    return res.status(200).json("post updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const savePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    const user = await users.findByPk(res.id);
    console.log("post id : " + id);
    console.log("user id : " + res.id);
    if (user && post) {
      await user.addSavedPost(post);
      return res.status(200).json("post saved successfully");
    } else return res.status(404).json({ error: "user or post is not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getSavedPosts = async (req, res) => {
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
      return res.status(200).json(savedPosts);
    } else return res.status(404).json({ error: "post is not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteSavedPost = async (req, res) => {
  const sevedPostId = req.params.id;
  try {
    await UserSavedPost.destroy({ where: { id: sevedPostId } });
    return res.status(200).json("post deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  timeline,
  createPost,
  deletePost,
  updatePost,
  savePost,
  getSavedPosts,
  deleteSavedPost,
};
