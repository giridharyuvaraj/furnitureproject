import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setIsNavExpanded(false);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid px-0">
        
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/assests/images/logo.png"
            alt="GT Enterprises"
            className="navbar-logo"
          />
          <span className="brand-text">Enterprises</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className={`navbar-toggler ${!isNavExpanded ? "collapsed" : ""}`}
          type="button"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
          aria-controls="navbarContent"
          aria-expanded={isNavExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div 
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`} 
          id="navbarContent"
        >

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto gap-lg-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {user && (user.role === "ADMIN" || user.role === "ROLE_ADMIN") && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto align-items-center gap-1">

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link cart-link position-relative" to="/cart">
                <img
                  src="/assests/images/icons/cart.png"
                  alt="Cart"
                  className="cart-icon"
                />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>

            {/* Auth */}
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link login-link" to="/login">
                  <img
                    src="/assests/images/icons/user.png"
                    alt="Login"
                    className="user-icon"
                  />
                  <span>Login</span>
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle user-dropdown"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="/assests/images/icons/user.png"
                    alt="User"
                    className="user-icon"
                  />
                  <span>{user.name || "Account"}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        dispatch(logout());
                        setIsNavExpanded(false);
                      }}
                    >
                      <img
                        src="/assests/images/icons/logout.png"
                        alt="Logout"
                        className="logout-icon me-2"
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;