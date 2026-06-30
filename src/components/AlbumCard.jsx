export default function AlbumCard({ album, onAddToCart, onViewAlbum }) {
  const image = album.artworkUrl600 || album.artworkUrl100?.replace('100x100', '600x600') || album.artworkUrl100 || album.image || '';

  return (
    <div className="col-md-4">
      <div className="card album-card h-100">
        <img src={image} className="card-img-top" alt={album.collectionName} />
        <div className="card-body">
          <h5 className="card-title">{album.collectionName}</h5>
          <p className="card-text">{album.artistName}</p>
          <p className="card-text">€{album.collectionPrice || 9.99}</p>
          <button className="btn btn-primary" onClick={() => onAddToCart(album)}>
            Add to cart
          </button>
          <button className="btn btn-outline-secondary ms-2" onClick={() => onViewAlbum(album.collectionId)}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
