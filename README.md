# Gn Store - المتجر الإلكتروني

![Gn Store Screenshot](https://via.placeholder.com/800x400?text=Gn+Store+Screenshot)

متجر إلكتروني متكامل مصمم لعرض وبيع المنتجات الإلكترونية مع نظام سلة تسوّق متكامل وإمكانية إتمام الطلب عبر الواتساب. يدعم التطبيق جلب البيانات من Google Sheets لإدارة المنتجات بسهولة.

## الميزات الرئيسية

- واجهة مستخدم عربية جميلة وسهلة الاستخدام
- نظام تصنيف المنتجات
- نظام سلة تسوّق متكامل
- إمكانية مشاركة المنتجات
- نظام تقييم المنتجات
- عروض خصومات مميزة
- إمكانية إتمام الطلب عبر الواتساب
- دعم Google Sheets لإدارة المنتجات دون الحاجة إلى تعديل الكود

## التقنيات المستخدمة

- React.js
- Tailwind CSS
- Lucide React (للحصول على الأيقونات)
- نظام دولي لتنسيق الأرقام (Intl)
- Google Sheets API
- Vercel Serverless Functions

## هيكل جدول البيانات في Google Sheets

يجب أن يحتوي جدول البيانات على الورقة التالية مع الأعمدة المذكورة:

### ورقة "Products"

| id | name | price | originalPrice | rating | reviews | image | category | discount | bestseller |
|----|------|-------|---------------|--------|---------|-------|----------|----------|------------|
| 1 | كيبل USB-C سريع الشحن | 23000 | 37000 | 4.5 | 1243 | URL | كيبلات | 38 | true |
| 2 | سماعات بلوتوث لاسلكية عالية الجودة | 129000 | 215000 | 4.7 | 856 | URL | سماعات | 40 | false |

## كيفية الإعداد

### 1. إعداد Google Sheets

1. أنشئ جدول بيانات في [Google Sheets](https://sheets.google.com)
2. أنشئ ورقة باسم "Products" مع الأعمدة المذكورة أعلاه
3. أدخل بيانات المنتجات

### 2. إعداد Google Cloud

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروعًا جديدًا
3. في لوحة التحكم، ابحث عن "Google Sheets API" وقم بتفعيله
4. أنشئ حسابًا خدميًا (Service Account):
   - اذهب إلى "IAM & Admin" > "Service Accounts"
   - انقر على "Create Service Account"
   - أدخل اسمًا ووصفًا
   - في خطوة "Grant this service account access to project"، أضف دور "Editor"
   - انقر على "Create"
   - في خطوة "Grant users access to this service account"، انقر على "Done"
   - ابحث عن الحساب الذي أنشأته وانقر على النقاط الثلاث > "Manage keys"
   - انقر على "Add Key" > "Create new key" > "JSON" > "Create"
   - سيتم تنزيل ملف JSON - احتفظ به في مكان آمن

5. شارك جدول البيانات مع البريد الإلكتروني الموجود في ملف JSON (في الحقل "client_email")

### 3. إعداد المشروع

1. قم بتنزيل المشروع أو استنساخه:
   ```bash
   git clone https://github.com/your-username/gn-store.git