import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '', cvv: '' });
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.collectionPrice || 9.99) * item.qty, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      setSubmitted(true);
      onClearCart();
    }, 1400);
  };

  if (submitted) {
    return (
      <div className="empty-state">
        <h2 className="fw-bold">Thanks for your order!</h2>
        <p className="text-muted">Your music order for {cart.length} album(s) is confirmed and a receipt is on its way to {form.email}.</p>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue shopping
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/cart')}>
            View cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="card border-0 shadow-sm p-4">
          <h2 className="fw-bold mb-3">Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows="3" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="card border-0 bg-light p-3 mb-3">
              <h6 className="fw-bold mb-3">Dummy Payment Gateway</h6>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input className="form-control" placeholder="4242 4242 4242 4242" required value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} />
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Expiry</label>
                  <input className="form-control" placeholder="MM/YY" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input className="form-control" placeholder="123" required value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} />
                </div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={processing}>
              {processing ? 'Processing payment...' : 'Pay now'}
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="summary-card p-4">
          <h4 className="fw-bold mb-3">Order summary</h4>
          {cart.map((item) => (
            <div key={item.collectionId} className="d-flex justify-content-between py-1 text-muted">
              <span>{item.collectionName}</span>
              <span>€{((item.collectionPrice || 9.99) * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-semibold fs-5">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
