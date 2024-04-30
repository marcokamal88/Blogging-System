import {myAxios} from "./myAxios"
export function login(data) {
    return myAxios.post("http://localhost:5000/login",data)
}
 export function register(data) {
    return myAxios.post("http://localhost:5000/register",data)
 }

