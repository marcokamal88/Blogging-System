import { Link } from "react-router-dom";
import "./header.css"
const Header = () => {
  return (
    <header class="timeline-header">
      <nav class="timeline-nav">
        <ul>
          <li>
          <Link to="/Home" >Timeline</Link>
          </li>
          <li>
            <Link to="/saved-posts" >Show Saved Posts</Link>
          </li>
          <li>
          <Link to="/saved-posts" >Create post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
