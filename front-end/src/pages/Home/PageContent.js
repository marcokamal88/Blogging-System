import noPic from "../images/not found img.jpg";

const PageContent = (props) => {
  return (
    <div>
      {props.response ? <div className="respons">{props.response}</div> : null}
      {props.Data.length > 0 ? (
        props.Data.map((post) => (
          <div key={post.id} className="post-container">
            <div className="user-name">username</div>
            <div className="post-title">{post.title}</div>
            <div className="post-category">{post.multiple_categories}</div>
            <div className="post-content">{post.content}</div>
            <div className="post-content">{post.summary}</div>
            <div className="post-content">
              {post.cover_image ? (
                <img src={post.cover_image} alt="post cover" />
              ) : (
                <img src={noPic} alt="post cover" />
              )}
            </div>
            <div className="save-post">
              <button type="submit" onClick={() => props.handler(post.id)}>
                {props.buttom}
              </button>
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
