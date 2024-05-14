import { myAxios } from "./myAxios";
export function timeline(config) {
  return myAxios.get("/timeline", config);
}
export function getUserPosts(id, config) {
  return myAxios.get(`/my_posts/${id}`, config);
}
export function updatePosts(id, data, config) {
  return myAxios.put(`/update_posts/${id}`, data, config);
}
export function deletePosts(id, config) {
  return myAxios.delete(`/delete_posts/${id}`, config);
}
export function createPost(data, config) {
  return myAxios.post("/create_posts", data, config);
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
