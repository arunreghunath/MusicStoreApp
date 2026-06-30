import { useNavigate } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';

export default function HomePage({ albums, loading, searchTerm, setSearchTerm, onAddToCart }) {
  const navigate = useNavigate();
  const filteredAlbums = albums.filter((album) => {
    const query = searchTerm.toLowerCase();
    return (
      album.collectionName?.toLowerCase().includes(query) ||
      album.artistName?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <section className="hero-card">
        <div>
          <p className="eyebrow">Fresh picks for every mood</p>
          <h1 className="display-6 fw-bold">Find your next favorite album</h1>
          <p className="text-muted mb-0">Search the catalog, build your wishlist, and check out in seconds with a streamlined experience.</p>
        </div>
        <div className="hero-actions">
          <div className="hero-pill">Fast checkout</div>
          <div className="hero-pill">Curated music</div>
        </div>
      </section>

      <div className="search-row">
        <div className="input-group search-box">
          <span className="input-group-text"><i className="bi bi-search" /></span>
          <input
            className="form-control"
            placeholder="Search by album or artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="results-pill">{filteredAlbums.length} albums</div>
      </div>

      {loading ? (
        <div className="empty-state">Loading albums...</div>
      ) : filteredAlbums.length === 0 ? (
        <div className="empty-state">
          <h5 className="fw-semibold">No albums match that search yet.</h5>
          <p className="text-muted mb-0">Try a different artist or album name to discover something new.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredAlbums.map((album) => (
            <AlbumCard
              key={album.collectionId}
              album={album}
              onAddToCart={onAddToCart}
              onViewAlbum={(id) => navigate(`/album/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
