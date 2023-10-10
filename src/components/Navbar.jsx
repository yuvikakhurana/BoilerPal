import { Link } from "react-router-dom";
import "./nav.css";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          BoilerPal
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <>
         <ul className="list">
          <li className="listItem">
        <Link className="link" to="login">
          Login
        </Link>
        </li>
        <li className="listItem">
        <Link className="link" to="register">
          Register
        </Link>
        </li>
        </ul>
      </>

        
      )}
    </div>
  );
};

export default Navbar;