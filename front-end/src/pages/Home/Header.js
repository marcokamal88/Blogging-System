import { Link, useNavigate } from "react-router-dom";
import "./header.css";
const Header = () => {
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    nav("/Login");
  };
  return (
    <header class="timeline-header">
      <nav class="timeline-nav">
        <ul>
          <li>
            <Link to="/Home">Timeline</Link>
          </li>
          <li>
            <Link to="/user-posts">my posts</Link>
          </li>
          <li>
            <Link to="/saved-posts">Show Saved Posts</Link>
          </li>
          <li>
            <Link to="/create-post">Create post</Link>
          </li>
        </ul>
        <div>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
