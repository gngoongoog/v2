// src/components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  viewMode, 
  currentPage, 
  totalPages, 
  setCurrentPage,
  addToCart,
  toggleWishlist,
  wishlist
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800 mb-2">حدث خطأ</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  
  const paginatedProducts = products.slice((currentPage - 1) * 50, currentPage * 50);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          عرض {paginatedProducts.length} من أصل {products.length} منتج
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">الصفحة:</span>
            <select 
              value={currentPage} 
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[...Array(totalPages)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">من {totalPages}</span>
          </div>
        )}
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد منتجات متاحة</h3>
          <p className="text-gray-600">نعتذر، لا توجد منتجات متوفرة حالياً. يرجى المحاولة لاحقاً.</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
            : 'grid-cols-1'
        }`}>
          {paginatedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            السابق
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === pageNum
                    ? 'bg-purple-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
