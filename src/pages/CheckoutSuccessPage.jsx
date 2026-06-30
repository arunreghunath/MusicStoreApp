import { Link, useLocation } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const state = location.state || {};
  const orderCount = state.orderCount || 0;
  const email = state.email || 'your inbox';

  return (
    <div className="d-flex justify-content-center">
      <div className="success-card p-4 p-md-5 text-center">
        <div className="mb-3">
          <span className="checkout-badge">Order confirmed</span>
        </div>
        <h2 className="fw-bold mb-3">Thanks for your order!</h2>
        <p className="text-muted mb-4">
          Your music order for {orderCount} album{orderCount === 1 ? '' : 's'} is confirmed and a receipt is on its way to {email}.
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <Link to="/" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link to="/cart" className="btn btn-outline-secondary">
            Review cart
          </Link>
        </div>
      </div>
    </div>
  );
}
