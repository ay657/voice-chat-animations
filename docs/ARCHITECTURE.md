# 🏗️ بنية المشروع (Project Architecture)

## نظرة عامة (Overview)

هذا المشروع عبارة عن مكتبة شاملة لرسوميات وتأثيرات متحركة لتطبيقات الدردشة الصوتية، مبنية على Node.js و Express.js.

## الطبقات (Layers)

### 1. طبقة الخادم (Server Layer)
```
src/server.js
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Static Files
├── Routes
│   ├── /api/animations
│   ├── /api/gifts
│   └── /api/effects
└── Error Handling
```

### 2. طبقة المسارات (Routes Layer)
```
src/routes/
├── animations.js   → معالجة طلبات الإطارات المتحركة
├── gifts.js        → معالجة طلبات الهدايا
└── effects.js      → معالجة طلبات التأثيرات
```

### 3. طبقة التحكم (Controllers Layer)
```
src/controllers/
├── animationController.js
│   ├── getAllFrames()
│   ├── getFrameById()
│   └── getFormats()
│
├── giftController.js
│   ├── getAllGifts()
│   ├── getGiftById()
│   └── getFormats()
│
└── effectController.js
    ├── getAllEffects()
    ├── getEffectsByType()
    └── getEffectAsset()
```

### 4. طبقة المرافق (Utilities Layer)
```
src/utils/
└── fileHandler.js
    ├── getFilesInDirectory()
    ├── fileExists()
    ├── getFileInfo()
    ├── isValidFormat()
    └── getAllAssets()
```

### 5. طبقة الأصول (Assets Layer)
```
assets/
├── frames/
│   ├── png/    → صور PNG شفافة
│   └── webp/   → صور WebP شفافة
├── gifts/
│   ├── mp4/    → فيديوهات MP4
│   └── lottie/ → ملفات Lottie JSON
└── effects/
    ├── svg/    → رسوميات SVG
    └── png/    → صور PNG
```

## تدفق الطلب (Request Flow)

```
┌────────────────────────────────────────────────────┐
│                    Client Request                  │
└─────────────────────┬────────────────────────────┘
                      │
                      ▼
        ┌──────────────────────────────┐
        │   Express Server (Port 3000) │
        └──────────────┬───────────────┘
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
        ┌─────────┐┌──────┐┌─────────────┐
        │Animation││Gifts ││Effects     │
        │Route    ││Route ││Route       │
        └────┬────┘└──┬───┘└────┬───────┘
             │        │         │
             ▼        ▼         ▼
        ┌─────────┐┌──────┐┌─────────────┐
        │Animation││Gift  ││Effect      │
        │Ctrl     ││Ctrl  ││Ctrl        │
        └────┬────┘└──┬───┘└────┬───────┘
             │        │         │
             ▼        ▼         ▼
        ┌────────────────────────────────┐
        │   File Handler / Data          │
        │   Processing                   │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   JSON Response                │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   Client Application           │
        └────────────────────────────────┘
```

## هيكل البيانات (Data Structure)

### إطار متحرك (Animation Frame)
```javascript
{
  id: string,                    // معرّف فريد
  name: string,                  // الاسم الواصف
  description: string,           // الوصف
  format: string,               // الصيغة الأساسية (PNG)
  format_alt: string,           // صيغة بديلة (WebP)
  url: string,                  // رابط الملف الأساسي
  url_alt: string,              // رابط الملف البديل
  duration: number,             // المدة بالميلي ثانية
  transparent: boolean,         // شفافية مدعومة؟
  size: { width, height }       // أبعاد الصورة
}
```

### هدية متحركة (Animated Gift)
```javascript
{
  id: string,                    // معرّف فريد
  name: string,                  // الاسم
  description: string,           // الوصف
  formats: [string],             // الصيغ المدعومة
  mp4_url: string,              // رابط الفيديو
  lottie_url: string,           // رابط Lottie
  thumbnail: string,            // صورة مصغرة
  duration: number,             // المدة
  color: string,                // اللون الأساسي
  category: string              // الفئة
}
```

### تأثير (Effect)
```javascript
{
  id: string,                    // معرّف فريد
  name: string,                  // الاسم
  description: string,           // الوصف
  type: string,                 // النوع (entrance/exit/idle)
  format: string,               // الصيغة (SVG/PNG)
  svg_url: string,              // رابط SVG
  png_url: string,              // رابط PNG
  duration: number,             // المدة
  easing: string,               // دالة التسهيل
  loop?: boolean                // هل يتكرر؟
}
```

## التكامل (Integration Points)

### مع تطبيقات الويب
```javascript
// في تطبيقك
import AnimationLibrary from 'voice-chat-animations';

const library = new AnimationLibrary();
const frames = await library.getFrames();
```

### مع تطبيقات الهاتف
```dart
// في تطبيق Flutter
final response = await http.get(
  Uri.parse('http://your-server/api/animations/frames')
);
final frames = jsonDecode(response.body)['frames'];
```

### مع WebSocket (للوقت الفعلي)
```javascript
// إرسال التأثيرات في الوقت الفعلي
socket.on('user-joined', async () => {
  const effect = await fetchEffect('entrance');
  socket.emit('play-effect', effect);
});
```

## قابلية التوسع (Scalability)

### التخزين المؤقت (Caching)
```javascript
// يمكن إضافة Redis للتخزين المؤقت
const cacheKey = `frames:${id}`;
const cached = await redis.get(cacheKey);
```

### قاعدة البيانات (Database)
```javascript
// يمكن استخدام MongoDB أو PostgreSQL
const frames = await Frame.find({ format: 'PNG' });
```

### المعالجة المتقدمة (Advanced Processing)
```javascript
// يمكن إضافة معالجة الصور
const optimized = await imageProcessor.optimize(image);
```

## الأمان (Security)

1. **CORS**: مُفعّل لجميع الطلبات
2. **Validation**: التحقق من صيغ الملفات
3. **Error Handling**: معالجة شاملة للأخطاء
4. **Rate Limiting**: (يمكن إضافته)
5. **Authentication**: (يمكن إضافته)

## الأداء (Performance)

- استخدام WebP لتقليل حجم الملفات
- ملفات MP4 محسّنة للويب
- Lottie للرسوميات الخفيفة
- SVG قابل للتحجيم
- تأثيرات الدخول والخروج معايرة لأداء الأمثل
