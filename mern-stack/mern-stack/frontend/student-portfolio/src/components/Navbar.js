import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>🎓 Student Portfolio</h1>
      <div className="nav-links">
        <Link to="/">View Students</Link>
        <Link to="/add">+ Add Student</Link>
      </div>
    </nav>
  );
}

export default Navbar;
