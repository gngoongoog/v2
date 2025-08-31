// هذا الملف سيوضع في مجلد api لكن في مشروع Vercel سيتم وضعه في pages/api
// ستحتاج إلى نقل هذا الملف إلى مجلد pages/api عند نشر المشروع على Vercel

const { google } = require('googleapis');

// معرف جدول البيانات (يجب أن تتم مشاركته مع خدمة Google Cloud)
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = 'Products';

export default async function handler(req, res) {
  try {
    // تحقق من وجود المفاتيح البيئية
    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT) {
      console.error('Missing environment variables for Google Sheets API');
      return res.status(500).json({ 
        error: 'Configuration error',
        message: 'Server is not properly configured to access product data'
      });
    }

    // تحليل معلومات الحساب الخدمي
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    
    // إنشاء اعتماد مصادقة
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // جلب البيانات من جدول البيانات
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:J1000`,
    });
    
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }
    
    // تخطي السطر الأول (العناوين)
    const headers = rows[0];
    const products = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const product = {};
      
      headers.forEach((header, index) => {
        if (index >= row.length) return;
        
        let value = row[index];
        header = header.trim().toLowerCase();
        
        // معالجة القيم حسب نوع العمود
        if (['id', 'price', 'originalprice', 'rating', 'reviews', 'discount'].includes(header)) {
          value = value ? parseFloat(value) : null;
        } else if (header === 'bestseller') {
          value = value ? value.toString().toLowerCase() === 'true' : false;
        }
        
        product[header] = value;
      });
      
      // تأكد من وجود الحقول المطلوبة
      if (product.id && product.name && product.price) {
        products.push(product);
      }
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: 'حدث خطأ أثناء جلب بيانات المنتجات'
    });
  }
}