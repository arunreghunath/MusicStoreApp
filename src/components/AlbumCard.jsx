export default function AlbumCard({ album, onAddToCart, onViewAlbum }) {
  const image = album.artworkUrl100 || album.image || '';

  return (
    <div className="col-md-4">
      <div className="card album-card h-100 border-0 shadow-sm">
        <img src={image} className="card-img-top" alt={album.collectionName} />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <div>
              <h5 className="card-title mb-1">{album.collectionName}</h5>
              <p className="text-muted mb-0">{album.artistName}</p>
            </div>
            <span className="badge rounded-pill badge-soft">€{album.collectionPrice || 9.99}</span>
          </div>
          <div className="mt-3 d-grid gap-2 mt-auto">
            <button className="btn btn-primary" onClick={() => onAddToCart(album)}>
              Add to cart
            </button>
            <button className="btn btn-outline-secondary" onClick={() => onViewAlbum(album.collectionId)}>
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
