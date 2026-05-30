# 🔌 API Documentation

## نقاط الوصول الرئيسية (Main Endpoints)

### الخادم الأساسي (Base URL)
```
http://localhost:3000
```

---

## 1️⃣ الإطارات المتحركة (Animation Frames API)

### الحصول على جميع الإطارات
```http
GET /api/animations/frames
```

**الاستجابة:**
```json
{
  "success": true,
  "total": 3,
  "frames": [
    {
      "id": "frame-001",
      "name": "Smile Animation",
      "format": "PNG",
      "format_alt": "WebP",
      "url": "/frames/png/smile-animation.png",
      "url_alt": "/frames/webp/smile-animation.webp",
      "duration": 1500,
      "transparent": true,
      "size": { "width": 256, "height": 256 }
    }
  ]
}
```

### الحصول على إطار معين
```http
GET /api/animations/frames/:id
```

**المثال:**
```http
GET /api/animations/frames/frame-001
```

### الحصول على الصيغ المدعومة
```http
GET /api/animations/formats
```

---

## 2️⃣ الهدايا المتحركة (Animated Gifts API)

### الحصول على جميع الهدايا
```http
GET /api/gifts
```

**الاستجابة:**
```json
{
  "success": true,
  "total": 3,
  "gifts": [
    {
      "id": "gift-001",
      "name": "Rose Gift",
      "formats": ["MP4", "Lottie"],
      "mp4_url": "/gifts/mp4/rose-gift.mp4",
      "lottie_url": "/gifts/lottie/rose-gift.json",
      "thumbnail": "/gifts/mp4/rose-gift-thumb.png",
      "duration": 3000,
      "color": "#FF69B4",
      "category": "romantic"
    }
  ]
}
```

### الحصول على هدية معينة
```http
GET /api/gifts/:id
```

**المثال:**
```http
GET /api/gifts/gift-001
```

### الحصول على الصيغ المدعومة
```http
GET /api/gifts/formats
```

---

## 3️⃣ تأثيرات الدخول (Entry Effects API)

### الحصول على جميع التأثيرات
```http
GET /api/effects
```

**الاستجابة:**
```json
{
  "success": true,
  "total": 4,
  "effects": [
    {
      "id": "entrance-001",
      "name": "Fade In",
      "type": "entrance",
      "format": "SVG",
      "svg_url": "/effects/svg/fade-in.svg",
      "png_url": "/effects/png/fade-in-frame.png",
      "duration": 800,
      "easing": "ease-in-out"
    }
  ],
  "categories": ["entrance", "exit", "idle"]
}
```

### الحصول على التأثيرات حسب النوع
```http
GET /api/effects/:type
```

**الأنواع المدعومة:**
- `entrance` - تأثيرات الدخول
- `exit` - تأثيرات الخروج
- `idle` - تأثيرات الانتظار

**المثال:**
```http
GET /api/effects/entrance
```

### الحصول على ملف التأثير
```http
GET /api/effects/:type/:id/asset
```

**المثال:**
```http
GET /api/effects/entrance/entrance-001/asset
```

---

## 🔍 استعلامات العينة (Sample Requests)

### باستخدام JavaScript Fetch

```javascript
// الحصول على جميع الإطارات
fetch('http://localhost:3000/api/animations/frames')
  .then(res => res.json())
  .then(data => console.log(data.frames));

// الحصول على هدية معينة
fetch('http://localhost:3000/api/gifts/gift-001')
  .then(res => res.json())
  .then(data => console.log(data.gift));

// الحصول على تأثيرات الدخول
fetch('http://localhost:3000/api/effects/entrance')
  .then(res => res.json())
  .then(data => console.log(data.effects));
```

### باستخدام cURL

```bash
# الحصول على جميع الإطارات
curl http://localhost:3000/api/animations/frames

# الحصول على هدية
curl http://localhost:3000/api/gifts/gift-001

# الحصول على التأثيرات
curl http://localhost:3000/api/effects/entrance
```

---

## 📊 رموز الحالة (Status Codes)

| الكود | المعنى |
|------|--------|
| 200 | نجح الطلب ✅ |
| 404 | المورد غير موجود ❌ |
| 500 | خطأ في الخادم ❌ |

---

## ⚙️ الترؤوس المتوقعة (Expected Headers)

```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## 🏃 ملاحظات مهمة

1. جميع الصور الشفافة تدعم الشفافية الكاملة (PNG و WebP)
2. فيديوهات MP4 محسّنة للويب مع قنوات ألفا
3. رسوميات Lottie قابلة للتطبيق والتخصيص
4. رسوميات SVG قابلة للتحجيم بدون فقدان الجودة
5. تأثيرات الدخول والخروج معايرة لأداء الأمثل
