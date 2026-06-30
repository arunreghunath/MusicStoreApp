import { Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';

const mapAlbum = (item) => ({
  collectionId: item.collectionId,
  collectionName: item.collectionName,
  artistName: item.artistName,
  artworkUrl100: item.artworkUrl100,
  artworkUrl600: item.artworkUrl600 || item.artworkUrl100?.replace('100x100', '600x600') || item.artworkUrl100,
  collectionPrice: item.collectionPrice,
  collectionViewUrl: item.collectionViewUrl,
  primaryGenreName: item.primaryGenreName,
  releaseDate: item.releaseDate,
  raw: item,
});

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const query = searchTerm.trim() || 'music';
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=12`)
        .then((res) => res.json())
        .then((data) => {
          setAlbums((data.results || []).map(mapAlbum));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (album) => {
    const existing = cart.find((item) => item.collectionId === album.collectionId);
    if (existing) {
      setCart(
        cart.map((item) => (item.collectionId === album.collectionId ? { ...item, qty: item.qty + 1 } : item))
      );
    } else {
      setCart([...cart, { ...album, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.collectionId !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="container py-4">
      <NavBar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage albums={albums} loading={loading} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddToCart={addToCart} />} />
        <Route path="/album/:id" element={<AlbumPage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onClearCart={clearCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onClearCart={clearCart} />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      </Routes>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />
      {isCartOpen && <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} />}

      <Footer />
    </div>
  );
}
