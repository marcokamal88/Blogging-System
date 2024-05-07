import { useEffect, useState } from "react";
import { savePost, timeline } from "../../api/posts";
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
const Home = () => {
  const [timelineData, setTimeLineData] = useState([]);
  useEffect(() => {
    timeline(config)
      .then((res) => {
        // console.log(res.data);
        setTimeLineData(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  const handleSavePost = (id) => {
    console.log(config);

    savePost(config.headers, id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  return (
    <>
      <Header /><br></br>
      <div>
        {timelineData.map((post) => (
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
              <button type="submit" onClick={() => handleSavePost(post.id)}>
                save post
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
// {post.cover_image}
