require("dotenv").config();
const { users, posts, UserSavedPost } = require("../models");

const timeline = async (req, res) => {
  const query = req.params;
  console.log("-------" + query.limit + " " + query.page);
  limit = query.limit || 10;
  page = query.page || 1;
  offset = (page - 1) * limit;
  // console.log(limit + " " + page);
  try {
    const myposts = await posts.findAll({ include: "users", limit, offset });
    return res.json(myposts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getMyPosts = async (req, res) => {
  const query = req.params;
  const userId = res.id;
  console.log("----"+userId);
  limit = query.limit || 10;
  page = query.page || 1;
  offset = (page - 1) * limit;
  try {
    const myPosts = await posts.findAll({ where: { userId }, limit, offset });
    return res.json(myPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createPost = async (req, res) => {
  const { title, cover_image, summary, multiple_categories, content } =
    req.body;
  const userId = res.id;
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
    // return res.json(post);
    return res.json("post created successfully :)");
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
    const savedPosts = await UserSavedPost.findAll({
      where: {
        userId,
      },
    });
    console.log("----------" + savedPosts);
    if (savedPosts) {
      const postIds = savedPosts.map((savedPost) => savedPost.postId);
      const Posts = await posts.findAll({
        where: {
          id: postIds,
        },
      });

      return res.status(200).json(Posts);
    } else return res.status(404).json({ error: "post is not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteSavedPost = async (req, res) => {
  const PostId = req.params.id;
  try {
    const myPost = await posts.findOne({ where: { id: PostId } });
    // console.log("-----------------"+myPost.id)
    if (!myPost) {
      return res.status(404).json({ error: "id not found" });
    }
    await UserSavedPost.destroy({ where: { postId: myPost.id } });
    return res.status(200).json("post unsaved successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  timeline,
  getMyPosts,
  createPost,
  deletePost,
  updatePost,
  savePost,
  getSavedPosts,
  deleteSavedPost,
};
