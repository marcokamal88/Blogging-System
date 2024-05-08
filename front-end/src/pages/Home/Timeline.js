import { useEffect, useState } from "react";
import { savePost, timeline } from "../../api/posts";
// import pic from "../images/testImg.png";
import "./timeline.css";
import Header from "./Header";
import PageContent from "./PageContent";
let config = {
  params: {
    page: 1,
    limit: 2,
  },
};
console.log(config);
const Home = () => {
  const [timelineData, setTimeLineData] = useState([]);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    timeline(config)
      .then((res) => {
        // console.log(res.data);
        setTimeLineData(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  const handleSavePost = (id) => {
    savePost(id)
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
        Data={timelineData}
        handler={handleSavePost}
        buttom="save post"
        response={response}
      />
    </>
  );
};
export default Home;
