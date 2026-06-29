import { Link } from 'react-router-dom';

export default function NavBar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar navbar-light rounded-4 px-3 py-3 mb-4 shadow-sm">
      <Link className="navbar-brand fw-bold fs-4 text-dark" to="/">
        Music Store
      </Link>
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-secondary btn-sm" to="/">
          Home
        </Link>
        <button className="btn btn-primary btn-sm position-relative" onClick={onCartClick}>
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
}
