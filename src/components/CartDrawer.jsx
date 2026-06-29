import { Link } from 'react-router-dom';

export default function CartDrawer({ cart, isOpen, onClose, onAddToCart, onRemoveFromCart, onClearCart }) {
  const total = cart.reduce((sum, item) => sum + (item.collectionPrice || 9.99) * item.qty, 0);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <div>
          <h4 className="fw-bold mb-1">Your cart</h4>
          <p className="text-muted mb-0">{cart.reduce((sum, item) => sum + item.qty, 0)} items selected</p>
        </div>
        <button className="btn btn-close-custom" onClick={onClose}>✕</button>
      </div>

      <div className="drawer-body">
        {cart.length === 0 ? (
          <div className="empty-state compact">
            <p className="mb-3">Your cart is empty.</p>
            <button className="btn btn-primary" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          cart.map((item) => (
            <div className="drawer-item" key={item.collectionId}>
              <div>
                <h6 className="mb-1">{item.collectionName}</h6>
                <p className="text-muted small mb-1">{item.artistName}</p>
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
          ))
        )}
      </div>

      <div className="drawer-footer">
        <div className="d-flex justify-content-between fw-semibold mb-3">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <div className="d-grid gap-2">
          <Link to="/cart" className="btn btn-primary" onClick={onClose}>
            View cart
          </Link>
          <Link to="/checkout" className="btn btn-outline-secondary" onClick={onClose}>
            Checkout
          </Link>
          {cart.length > 0 && (
            <button className="btn btn-link text-muted p-0" onClick={onClearCart}>
              Clear cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
