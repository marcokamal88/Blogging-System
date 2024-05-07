import { useEffect, useState } from "react";
import { deleteSavedPost, savedPosts } from "../../api/posts";
// import pic from "../images/testImg.png";
import "./timeline.css";
import Header from "./Header";
let config = {
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
  },
  params: {
    page: 1,
    limit: 5,
  },
};
console.log(config);
const SavedPosts = () => {
  const [savedPostsData, setSavedPosts] = useState([]);
  useEffect(() => {
    savedPosts(config)
      .then((res) => {
        console.log(res.data);
        setSavedPosts(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  const handleUnSavePost = (id) => {
    console.log(config);
    deleteSavedPost(config.headers, id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  return (
    <>
      <Header />
      <br></br>
      <div>
        {savedPostsData!=[] ? (
          savedPostsData.map((post) => (
            <div key={post.id} className="post-container">
              <div className="user-name">name</div>
              <div className="post-title">{post.title}</div>
              <div className="post-category">{post.multiple_categories}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-content">{post.summary}</div>
              <div className="post-content">
                <img src={post.cover_image} alt="post cover" />
              </div>
              <div className="save-post">
                <button type="submit" onClick={() => handleUnSavePost(post.id)}>
                  unsave post
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>no saved posts founded</h1>
        )}
      </div>
    </>
  );
};
export default SavedPosts;
// {post.cover_image}
