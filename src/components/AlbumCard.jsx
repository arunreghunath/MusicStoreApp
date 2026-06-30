export default function AlbumCard({ album, onAddToCart, onViewAlbum }) {
  const image = album.artworkUrl100 || album.image || '';

  return (
    <div className="col-md-4">
      <div className="card album-card h-100 border-0">
        <div className="image-wrap">
          <img src={image} className="card-img-top" alt={album.collectionName} />
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <div>
              <h5 className="card-title mb-1">{album.collectionName}</h5>
              <p className="text-muted mb-0">{album.artistName}</p>
            </div>
            <span className="price-pill">€{album.collectionPrice || 9.99}</span>
          </div>
          <div className="mt-auto d-grid gap-2">
            <button className="btn btn-primary" onClick={() => onAddToCart(album)}>
              <i className="bi bi-cart-plus me-1" /> Add to cart
            </button>
            <button className="btn btn-outline-secondary" onClick={() => onViewAlbum(album.collectionId)}>
              <i className="bi bi-eye me-1" /> View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
