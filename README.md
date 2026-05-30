# 🎬 Voice Chat Animations Library

مكتبة شاملة لرسوميات وتأثيرات متحركة لتطبيقات الدردشة الصوتية

## 📦 المميزات الرئيسية

### 1. 🖼️ مكتبة الإطارات المتحركة (Animation Frames)
- صور PNG شفافة (Transparent PNG)
- صور WebP شفافة (Transparent WebP)
- دقة عالية وحجم ملفات محسّن

### 2. 🎁 مكتبة الهدايا المتحركة (Animated Gifts)
- فيديو MP4 متحرك
- رسوميات Lottie JSON
- تأثيرات الهدايا المتعددة

### 3. ✨ تأثيرات الدخول (Entry Effects)
- رسوميات SVG قابلة للتخصيص
- صور PNG للتأثيرات الثابتة
- تأثيرات حركة سلسة

### 4. 🌐 نظام API متكامل
- مسارات REST API للوصول للرسوميات
- معالجة الملفات وتقديمها
- دعم CORS
- إرجاع بيانات JSON منظمة

## 🚀 البدء السريع

### التثبيت
```bash
git clone https://github.com/ay657/voice-chat-animations.git
cd voice-chat-animations
npm install
```

### التشغيل
```bash
# وضع التطوير
npm run dev

# الإنتاج
npm start
```

الخادم سيعمل على: `http://localhost:3000`

## 📁 البنية المشروعة

```
voice-chat-animations/
├── src/
│   ├── server.js              # خادم Express الرئيسي
│   ├── index.js               # نقطة الدخول
│   ├── routes/
│   │   ├── animations.js       # مسارات الإطارات المتحركة
│   │   ├── gifts.js            # مسارات الهدايا
│   │   └── effects.js          # مسارات التأثيرات
│   ├── controllers/
│   │   ├── animationController.js
│   │   ├── giftController.js
│   │   └── effectController.js
│   └── utils/
│       └── fileHandler.js      # معالجة الملفات
├── assets/
│   ├── frames/
│   │   ├── png/                # صور PNG شفافة
│   │   └── webp/               # صور WebP شفافة
│   ├── gifts/
│   │   ├── mp4/                # فيديوهات MP4
│   │   └── lottie/             # رسوميات Lottie JSON
│   └── effects/
│       ├── svg/                # رسوميات SVG
│       └── png/                # صور PNG للتأثيرات
├── docs/
│   ├── API.md                  # توثيق API كاملة
│   └── ARCHITECTURE.md         # بنية المشروع
├── package.json
└── README.md
```

## 🔌 نقاط الوصول للـ API

### الإطارات المتحركة
```
GET /api/animations/frames       # قائمة جميع الإطارات
GET /api/animations/frames/:id   # تفاصيل إطار معين
GET /api/animations/formats      # الصيغ المدعومة
```

### الهدايا
```
GET /api/gifts                   # قائمة جميع الهدايا
GET /api/gifts/:id               # تفاصيل هدية معينة
GET /api/gifts/formats           # الصيغ المدعومة
```

### التأثيرات
```
GET /api/effects                 # قائمة التأثيرات
GET /api/effects/:type           # تأثيرات حسب النوع
GET /api/effects/:type/:id/asset # ملف التأثير الفعلي
```

## 🎨 أمثلة على الاستخدام

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

## 📋 أنواع الملفات المدعومة

| النوع | الصيغ المدعومة | الوصف |
|------|----------------|-------|
| الإطارات | PNG, WebP | صور شفافة عالية الجودة |
| الهدايا | MP4, Lottie JSON | فيديوهات ورسوميات ديناميكية |
| التأثيرات | SVG, PNG | رسوميات قابلة للتحجيم والتخصيص |

## 🔧 المتطلبات

- Node.js 14+
- npm أو yarn
- متصفح حديث يدعم WebP و SVG

## 📝 الترخيص

هذا المشروع مرخص تحت MIT License

## 👤 المساهم

ay657

## 📞 التواصل والدعم

للمزيد من المعلومات، يرجى زيارة صفحة المشروع على GitHub.
