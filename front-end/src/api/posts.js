import {myAxios} from "./myAxios"
export function timeline(config) {
    return myAxios.get("http://localhost:5000/timeline",config)
}
export function savePost(headers,id) {
    return myAxios.post(`http://localhost:5000/save_posts/${id}`,{},{headers:headers})
}
export function savedPosts(config) {
    return myAxios.get("http://localhost:5000/saved_posts",config)
}
export function deleteSavedPost(headers,id) {
    return myAxios.delete(`http://localhost:5000/delete_saved_posts/${id}`,{headers:headers})
}

