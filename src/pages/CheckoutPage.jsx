import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.collectionPrice || 9.99) * item.qty, 0);

  const validateCard = () => {
    const cardDigits = form.card.replace(/\D/g, '');
    if (cardDigits.length !== 16) {
      setError('Card number must be 16 digits.');
      return false;
    }

    const [month, year] = form.expiry.split('/');
    if (!month || !year || Number(month) < 1 || Number(month) > 12) {
      setError('Expiry must be a valid month/year.');
      return false;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
      setError('Card has expired.');
      return false;
    }

    if (form.cvv.replace(/\D/g, '').length < 3) {
      setError('CVV must be at least 3 digits.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateCard()) return;

    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      onClearCart();
      navigate('/checkout/success', { state: { orderCount: cart.length, email: form.email } });
    }, 1400);
  };

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="checkout-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="eyebrow mb-1">Secure checkout</p>
              <h2 className="fw-bold mb-0">Checkout</h2>
            </div>
            <span className="checkout-badge">Encrypted</span>
          </div>
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

            <div className="payment-card p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Dummy Payment Gateway</h6>
                <i className="bi bi-credit-card-2-front fs-5 text-primary" />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  className="form-control"
                  placeholder="4242 4242 4242 4242"
                  required
                  value={form.card}
                  inputMode="numeric"
                  maxLength="19"
                  onChange={(e) => setForm({ ...form, card: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                />
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Expiry</label>
                  <input
                    className="form-control"
                    placeholder="MM/YY"
                    required
                    value={form.expiry}
                    maxLength="5"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                      setForm({ ...form, expiry: formatted });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input
                    className="form-control"
                    placeholder="123"
                    required
                    value={form.cvv}
                    inputMode="numeric"
                    maxLength="4"
                    onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button className="btn btn-primary w-100" type="submit" disabled={processing}>
              {processing ? 'Processing payment...' : 'Pay now'}
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="summary-card p-4">
          <h4 className="fw-bold mb-3">Order summary</h4>
          {cart.map((item) => (
            <div key={item.collectionId} className="d-flex justify-content-between py-2 text-muted">
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
