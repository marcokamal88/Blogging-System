import { useNavigate } from "react-router-dom";
import noPic from "../images/not found img.jpg";
import { useContext } from "react";
import MyContext from "./Context";
const PageContent = (props) => {
  const { Id, setId } = useContext(MyContext);
  const nav = useNavigate();
  return (
    <div>
      {props.response ? <div className="respons">{props.response}</div> : null}
      {props.Data.length > 0 ? (
        props.Data.map((post) => (
          <div key={post.id} className="post-container">
            <div className="user-name">{post.user.name}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-category">{post.multiple_categories}</div>
            <div className="post-content">{post.content}</div>
            <div className="post-summary">{post.summary}</div>
            <div className="post-img">
              {post.cover_image ? (
                <img
                  src={"http://127.0.0.1:5000/" + post.cover_image}
                  alt={post.cover_image}
                />
              ) : (
                <img src={noPic} alt="post cover" />
              )}
            </div>
            <div className="button">
              <button type="submit" onClick={() => props.handler[0](post.id)}>
                {props.buttom}
              </button>
              {props.editPost ? (
                <button
                  onClick={() => {
                    setId(post.id);
                    nav("/Edit-post");
                  }}
                >
                  Edit post
                </button>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <h1 className="no_posts">no posts here </h1>
      )}
    </div>
  );
};
export default PageContent;
// post.cover_image
