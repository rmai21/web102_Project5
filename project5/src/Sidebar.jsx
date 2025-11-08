import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li>Search</li>
        <li>About</li>
      </ul>
    </nav>
  );
}

export default Sidebar;
