import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
