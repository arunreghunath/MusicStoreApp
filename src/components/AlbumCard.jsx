export default function AlbumCard({ album, onAddToCart, onViewAlbum }) {
  const image = album.artworkUrl600 || album.artworkUrl100?.replace('100x100', '600x600') || album.artworkUrl100 || album.image || '';

  return (
    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
      <div className="card album-card h-100">
        <img src={image} className="card-img-top" alt={album.collectionName} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1">{album.collectionName}</h5>
          <p className="card-text text-muted mb-2">{album.artistName}</p>
          <p className="card-text fw-semibold mb-3">€{album.collectionPrice || 9.99}</p>
          <div className="mt-auto d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(album)}>
              <i className="bi bi-cart-plus me-1" /> Add
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onViewAlbum(album.collectionId)}>
              <i className="bi bi-eye me-1" /> Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
