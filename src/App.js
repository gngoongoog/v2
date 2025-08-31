// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import { fetchProducts } from './utils/api';
import { formatPrice } from './utils/formatPrice';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 50;

  const categories = ['all', 'اكسسوارات', 'شاحنات', 'كيبلات', 'سماعات', 'لزقات حماية'];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('فشل في جلب المنتجات. يرجى التحقق من اتصالك بالإنترنت.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name && product.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;
    
    const phoneNumber = '+9647707409507';
    let message = '🛍️ *طلب جديد من متجر Gn Store*\n\n';
    message += '📦 *تفاصيل الطلب:*\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   الكمية: ${item.quantity}\n`;
      message += `   السعر: ${formatPrice(item.price)}\n`;
      message += `   المجموع: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    message += `💰 *المجموع الكلي: ${formatPrice(cartTotal)}*\n\n`;
    message += '📞 سأقوم بالتواصل معكم لتأكيد الطلب وتفاصيل التوصيل\n\n';
    message += '🙏 شكراً لاختياركم متجر Gn Store';
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItemsCount={cartItemsCount}
        setCurrentView={setCurrentView}
      />
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setCurrentPage={setCurrentPage}
      />
      
      {currentView === 'home' ? (
        <ProductGrid 
          products={filteredProducts}
          loading={loading}
          error={error}
          viewMode={viewMode}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      ) : (
        <CartView 
          cart={cart} 
          cartTotal={cartTotal}
          cartItemsCount={cartItemsCount}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          sendOrderToWhatsApp={sendOrderToWhatsApp}
          setCurrentView={setCurrentView}
        />
      )}
      
      {/* زر ثابت للعودة لأعلى */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;
