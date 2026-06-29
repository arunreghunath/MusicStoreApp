export default function Footer() {
  return (
    <footer className="footer mt-5 py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div>
          <h6 className="fw-bold mb-1">Music Store</h6>
          <p className="text-muted small mb-0">Discover albums, build your cart, and enjoy your favorite sounds.</p>
        </div>
        <div className="text-muted small">
          © {new Date().getFullYear()} Music Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
