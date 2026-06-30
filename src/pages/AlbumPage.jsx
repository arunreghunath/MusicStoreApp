import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AlbumPage({ onAddToCart }) {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];
        const albumInfo = results.find((item) => item.wrapperType === 'collection') || results[0] || null;
        const songList = results.filter((item) => item.wrapperType === 'track');
        setAlbum(albumInfo);
        setTracks(songList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="empty-state">Loading album details...</div>;
  if (!album) return <div className="empty-state">Album not found.</div>;

  const image = album.artworkUrl600 || album.artworkUrl100?.replace('100x100', '600x600') || album.artworkUrl100 || '';
  const releaseYear = album.releaseDate ? new Date(album.releaseDate).getFullYear() : '—';

  return (
    <div className="detail-shell">
      <div className="detail-hero">
        <div className="detail-cover-wrap">
          <img src={image} alt={album.collectionName} className="detail-cover" />
        </div>
        <div className="detail-hero-content">
          <p className="eyebrow mb-2">Album</p>
          <h1 className="detail-title">{album.collectionName}</h1>
          <p className="detail-subtitle">{album.artistName}</p>
          <div className="meta-row mb-3">
            <span className="meta-pill">{tracks.length} songs</span>
            <span className="meta-pill">{releaseYear}</span>
            <span className="meta-pill">{album.primaryGenreName || 'Music'}</span>
          </div>
          <p className="detail-price">€{album.collectionPrice || 9.99}</p>
          <div className="d-flex gap-2 flex-wrap mt-3">
            <button className="btn btn-primary" onClick={() => onAddToCart(album)}>
              <i className="bi bi-cart-plus me-1" /> Add to cart
            </button>
            <a href={album.collectionViewUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary">
              <i className="bi bi-box-arrow-up-right me-1" /> Open in iTunes
            </a>
            <Link to="/" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-1" /> Back home
            </Link>
          </div>
        </div>
      </div>

      <div className="track-list mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Track list</h4>
          <span className="text-muted small">Preview available for select tracks</span>
        </div>
        {tracks.length === 0 ? (
          <div className="track-item">No tracks available right now.</div>
        ) : (
          tracks.map((track) => (
            <div className="track-item" key={track.trackId || track.trackName}>
              <div className="d-flex align-items-center gap-3">
                <div className="track-number">{track.trackNumber}</div>
                <div>
                  <div className="fw-semibold">{track.trackName}</div>
                  <div className="text-muted small">{track.artistName || album.artistName}</div>
                </div>
              </div>
              <div className="track-meta">
                {track.previewUrl ? (
                  <audio controls preload="none" className="audio-preview">
                    <source src={track.previewUrl} type="audio/mpeg" />
                  </audio>
                ) : (
                  <span className="text-muted small">Preview unavailable</span>
                )}
                <span className="text-muted small">{track.trackTimeMillis ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(Math.floor((track.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}` : ''}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
