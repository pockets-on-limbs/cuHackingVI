import "../styles/Navbar.css";

export function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Spotify Clone</h2>
      </div>
      <div className="navbar-right">
        <button className="nav-button">Home</button>
        <button className="nav-button">Search</button>
        <button className="nav-button">Your Library</button>
      </div>
    </div>
  );
}
