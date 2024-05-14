import { useEffect, useState } from "react";
import Header from "./Header";
import PageContent from "./PageContent";
import { deletePosts, getUserPosts} from "../../api/posts";
import { useNavigate } from "react-router-dom";
let config = {
  params: {
    page: 1,
    limit: 2,
  },
};
const UserPosts = () => {
  const [userPostsData, setUserPostsData] = useState([]);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    getUserPosts(config)
      .then((res) => {
        // console.log(res.data);
        setUserPostsData(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);
  const handleDeletePost = (id) => {
    deletePosts(id)
      .then((res) => {
        // console.log(res.data);
        setResponse(res.data);
        setTimeout(() => setResponse(null), 3000);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        setResponse(err.response.data.error);
        setTimeout(() => setResponse(null), 3000);
      });
  };
  const nav = useNavigate();
  const handleEditPost = (id) => {
    nav("/Edid-post");
  };
  // const buttons = ["Edit post", "Delete post"];
  return (
    <>
      <Header />
      <br></br>
      <PageContent
        Data={userPostsData}
        handler={[handleDeletePost,handleEditPost]}
        buttom="Delete post"
        response={response}
        editPost={true}
      />
    </>
  );
};
export default UserPosts;
