import { useEffect, useState } from "react";
import { deleteSavedPost, savedPosts } from "../../api/posts";
import PageContent from "./PageContent";
import "./timeline.css";
import Header from "./Header";
let config = {
  params: {
    page: 1,
    limit: 2,
  },
};
console.log(config);
const SavedPosts = () => {
  const [savedPostsData, setSavedPosts] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    savedPosts(config)
      .then((res) => {
        console.log(res.data);
        setSavedPosts(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  const handleUnSavePost = (id) => {
    deleteSavedPost(id)
      .then((res) => {
        // console.log(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        setResponse(err.response.data.error);
      });
  };

  return (
    <>
      <Header />
      <br></br>
      <PageContent
        Data={savedPostsData}
        handler={handleUnSavePost}
        buttom="unsave post"
        response={response}
      />
    </>
  );
};
export default SavedPosts;
