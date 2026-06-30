import { Link } from 'react-router-dom';

export default function CartPage({ cart, onAddToCart, onRemoveFromCart, onClearCart }) {
  const total = cart.reduce((sum, item) => sum + (item.collectionPrice || 9.99) * item.qty, 0);

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Your cart</h2>
            <p className="text-muted mb-0">Review your music picks before checkout.</p>
          </div>
          {cart.length > 0 && (
            <button className="btn btn-outline-secondary btn-sm" onClick={onClearCart}>
              Clear all
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <p className="mb-3">Your cart is empty right now.</p>
            <Link to="/" className="btn btn-primary">
              Browse albums
            </Link>
          </div>
        ) : (
          cart.map((item) => {
            const image = item.artworkUrl600 || item.artworkUrl100?.replace('100x100', '600x600') || item.artworkUrl100 || '';
            return (
              <div className="cart-item mb-3" key={item.collectionId}>
                <div className="d-flex align-items-center gap-3">
                  <div className="cart-item-image-wrap">
                    <img src={image} alt={item.collectionName} />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.collectionName}</h5>
                    <p className="text-muted mb-1">{item.artistName}</p>
                    <p className="fw-semibold mb-0">€{((item.collectionPrice || 9.99) * item.qty).toFixed(2)}</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => onRemoveFromCart(item.collectionId)}>
                      −
                    </button>
                    <span className="fw-bold">{item.qty}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => onAddToCart(item)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="col-lg-4">
        <div className="summary-card p-4">
          <h4 className="fw-bold mb-3">Summary</h4>
          <div className="d-flex justify-content-between text-muted mb-2">
            <span>Items</span>
            <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
          </div>
          <div className="d-flex justify-content-between fw-semibold fs-5">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <div className="d-grid gap-2 mt-4">
            <Link to="/checkout" className="btn btn-primary">
              Proceed to checkout
            </Link>
            <Link to="/" className="btn btn-outline-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
