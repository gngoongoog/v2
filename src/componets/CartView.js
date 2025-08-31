// src/components/CartView.jsx
import React from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const CartView = ({ 
  cart, 
  cartTotal, 
  cartItemsCount, 
  updateQuantity, 
  removeFromCart, 
  sendOrderToWhatsApp, 
  setCurrentView
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">سلة التسوق</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="text-purple-600 hover:text-purple-700"
        >
          العودة للتسوق
        </button>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">سلة التسوق فارغة</p>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            ابدأ التسوق
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=صورة+غير+متوفرة';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-purple-600 font-bold">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ملخص الطلب</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>التوصيل:</span>
                <span className="text-green-600">مجاني</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع الكلي:</span>
                <span className="text-purple-600">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button 
              onClick={sendOrderToWhatsApp}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.297-.297-.099-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15z"></path>
              </svg>
              إتمام الطلب عبر الواتساب
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
