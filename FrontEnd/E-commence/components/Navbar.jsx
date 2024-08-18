import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      {auth ? (
        <>
          <img
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DxSKO2ZBs4t-u06rEtqe6t2joiDFDlhWAA&s"
            alt="logo"
          />
          <ul className="nav-ul">
            <li>
              <Link to="/">Product</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <Link onClick={logout} to="/signup">
                Logout
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className="nav-ul nav-right">
          {" "}
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
