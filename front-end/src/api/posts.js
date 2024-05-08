import { myAxios } from "./myAxios";
export function timeline(config) {
  return myAxios.get("/timeline", config);
}

export function createPost(data) {
    return myAxios.post("/create_posts",data)
}
export function savePost(id) {
  return myAxios.post(`/save_posts/${id}`);
}
export function savedPosts(config) {
  return myAxios.get("/saved_posts", config);
}
export function deleteSavedPost(id) {
  return myAxios.delete(`/delete_saved_posts/${id}`);
}