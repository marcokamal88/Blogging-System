import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import "./App.css";
import Home from "./pages/Home/Timeline";
import SavedPosts from "./pages/Home/SavedPosts";
import ProtectedRoute from "./ProtectedRout";
import NoPage from "./pages/NoPage";
import CreatePost from "./pages/Home/CreatePost";
import UserPosts from "./pages/Home/UserPosts";
import EditPost from "./pages/Home/EditPost";
import Provider from "./pages/Home/Provider";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route>
              <Route index element={<Register />} />
              <Route
                path="/Login"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Register"
                element={
                  <ProtectedRoute>
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-posts"
                element={
                  <ProtectedRoute>
                    <SavedPosts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-posts"
                element={
                  <ProtectedRoute>
                    <UserPosts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Edit-post"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
