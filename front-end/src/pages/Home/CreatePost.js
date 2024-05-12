import { createPost } from "../../api/posts";
import Header from "./Header";
import { useFormik } from "formik";
import "./createPost.css";
import { useState } from "react";

const CreatePost = () => {
  const [response, setResponse] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      multiple_categories: "",
      content: "",
      summary: "",
      cover_image: "",
    },

    onSubmit: (values) => {
      let title = values.title;
      let category = values.multiple_categories;
      let content = values.content;
      let summary = values.summary;
      let image = values.cover_image;
      // console.log(values);
      // console.log({ title, category, content, summary, image });
      createPost({ title, category, content, summary, image })
        .then((res) => {
          // console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          // console.log(err.response.data.error);
          setResponse(err.response.data.error);
        });
    },
  });
  return (
    <>
      <Header />
      <br></br>
      <form className="create-post" onSubmit={formik.handleSubmit}>
        <div className="container">
          <h1>Create a new post</h1>
          <div className="title">
            <label>Title</label>
            <input
              onChange={formik.handleChange}
              type="text"
              placeholder="title"
              name="title"
            />
          </div>
          <div className="category">
            <label>Category</label>
            <input
              onChange={formik.handleChange}
              type="text"
              placeholder="category"
              name="multiple_categories"
            />
          </div>
          <div className="content">
            <label>Content</label>
            <input
              onChange={formik.handleChange}
              type="text"
              placeholder="content"
              name="content"
            />
          </div>
          <div className="summary">
            <label>Summary</label>
            <input
              onChange={formik.handleChange}
              type="text"
              placeholder="summary"
              name="summary"
            />
          </div>
          <div className="image">
            <label> Image</label>
            <input
              onChange={formik.handleChange}
              type="file"
              placeholder="image"
              accept="image/*"
              name="cover_image"
            />
          </div>
          {response ? <div className="respons">{response}</div> : null}
          <div className="submit">
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreatePost;