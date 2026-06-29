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
          <p className="text-muted mb-0">Search the iTunes catalog, build your wishlist and checkout in seconds.</p>
        </div>
        <div className="hero-pill">Fast checkout · Curated music</div>
      </section>

      <div className="search-row">
        <div className="input-group search-box">
          <span className="input-group-text">🔎</span>
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
        <div className="empty-state">No albums match that search yet.</div>
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
