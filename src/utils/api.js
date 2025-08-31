// src/utils/api.js
export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error('فشل في جلب البيانات من الخادم');
    }
    
    const products = await response.json();
    
    // التحقق من هيكل البيانات
    if (!Array.isArray(products)) {
      throw new Error('بيانات المنتجات غير صحيحة');
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // استخدام بيانات نموذجية كخيار احتياطي
    return [
      { id: 1, name: 'كيبل USB-C سريع الشحن', price: 23000, originalPrice: 37000, rating: 4.5, reviews: 1243, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop', category: 'كيبلات', discount: 38, bestseller: true },
      { id: 2, name: 'سماعات بلوتوث لاسلكية عالية الجودة', price: 129000, originalPrice: 215000, rating: 4.7, reviews: 856, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'سماعات', discount: 40 },
      { id: 3, name: 'شاحن لاسلكي سريع 15W', price: 47000, originalPrice: 72000, rating: 4.3, reviews: 567, image: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=300&h=300&fit=crop', category: 'شاحنات', discount: 34 },
      { id: 4, name: 'حامي شاشة زجاجي مقاوم للكسر', price: 13000, originalPrice: 23000, rating: 4.6, reviews: 2341, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', category: 'لزقات حماية', discount: 44, bestseller: true },
      { id: 5, name: 'حلقة حامل الهاتف المغناطيسية', price: 8500, originalPrice: 18500, rating: 4.2, reviews: 789, image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop', category: 'اكسسوارات', discount: 54 },
    ];
  }
};