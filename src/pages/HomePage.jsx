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
      <div className="hero-card">
        <div>
          <h2>Find an album</h2>
          <p>Search for albums and add them to your cart.</p>
        </div>
        <div className="hero-actions">
          <span className="hero-pill">Fast checkout</span>
          <span className="hero-pill">Music</span>
        </div>
      </div>

      <div className="search-row">
        <div className="input-group search-box">
          <span className="input-group-text">
            <i className="bi bi-search" />
          </span>
          <input
            className="form-control"
            placeholder="Search album or artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="results-pill">{filteredAlbums.length} albums</div>
      </div>

      {loading ? (
        <div className="empty-state">Loading albums...</div>
      ) : filteredAlbums.length === 0 ? (
        <div className="empty-state">No results yet.</div>
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
