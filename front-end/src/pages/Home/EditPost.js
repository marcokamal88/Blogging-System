import "./createPost.css";
import { getOnePost, updatePosts } from "../../api/posts";
import Header from "./Header";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useContext } from "react";
import MyContext from "./Context";

const EditPost = () => {
  const [response, setResponse] = useState(null);
  const { Id } = useContext(MyContext);
  const [data, setData] = useState({});
  useEffect(() => {
    getOnePost(Id).then((res) => {
      setData(res.data);
      console.log("render");
    });
  }, [Id]);

  const formik = useFormik({
    initialValues: {
      title: data.title,
      multiple_categories: data.multiple_categories,
      content: data.content,
      summary: data.summary,
      cover_image: data.cover_image,
    },

    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      for (let key in values) {
        // Check if the value has changed compared to the original data
        if (values[key] !== data[key] && values[key]) {
          // If the value has changed, append it to the FormData object
          formData.append(key, values[key]);
          console.log(key, values[key]);
        }
      }
      // formData.append("title", values.title);
      // formData.append("content", values.content);
      // formData.append("cover_image", values.cover_image);
      // formData.append("summary", values.summary);
      // formData.append("multiple_categories", values.multiple_categories);
      console.log(values);
      updatePosts(Id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          // console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          // console.log(err.response.data.error);
          setResponse(err.response.data.error);
        });

      setSubmitting(false);
    },
  });

  return (
    <>
      <Header />
      <br></br>
      <form className="create-post" onSubmit={formik.handleSubmit}>
        <div className="container">
          <h1>Edit post</h1>
          <div className="title">
            <label>Title</label>
            <input
              onChange={formik.handleChange}
              type="text"
              // placeholder="title"
              name="title"
              placeholder={data.title}
            />
          </div>
          <div className="category">
            <label>Category</label>
            <input
              onChange={formik.handleChange}
              type="text"
              // placeholder="category"
              name="multiple_categories"
              placeholder={data.multiple_categories}
            />
          </div>
          <div className="content">
            <label>Content</label>
            <input
              onChange={formik.handleChange}
              type="text"
              // placeholder="content"
              name="content"
              placeholder={data.content}
            />
          </div>
          <div className="summary">
            <label>Summary</label>
            <input
              onChange={formik.handleChange}
              type="text"
              // placeholder="summary"
              name="summary"
              placeholder={data.summary}
            />
          </div>
          <div className="image">
            <label> Image</label>
            <input
              onChange={(event) => {
                formik.setFieldValue(
                  "cover_image",
                  event.currentTarget.files[0]
                );
              }}
              type="file"
              // placeholder="image"
              accept="image/*"
              name="cover_image"
              placeholder={data.cover_image}
            />
            {formik.values.cover_image && (
              <img
                className="preview"
                src={URL.createObjectURL(formik.values.cover_image)}
                alt="Cover"
              />
            )}
          </div>
          {response ? <div className="respons">{response}</div> : null}
          <div className="submit">
            <button
              className="btn"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default EditPost;
