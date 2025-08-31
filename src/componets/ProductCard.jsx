// src/components/ProductCard.jsx
import React from 'react';
import { Heart, ShoppingCart, Share2, Star } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product, addToCart, toggleWishlist, wishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=صورة+غير+متوفرة';
          }}
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        {product.bestseller && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            الأكثر مبيعاً
          </div>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
            wishlist.some(item => item.id === product.id) 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-50'
          }`}
        >
          <Heart size={16} fill={wishlist.some(item => item.id === product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 mr-1">
            ({product.reviews || 0})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-purple-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-1"
          >
            <ShoppingCart size={14} />
            أضف للسلة
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;