# 📚 Complete API Reference

## 🎯 Overview

هذا النظام يوفر مكتبة شاملة لـ:
- 🎬 الرسوميات المتحركة (Animation Frames)
- 🎁 الهدايا المتحركة (Animated Gifts)
- ✨ تأثيرات الدخول والخروج (Entry/Exit Effects)
- 🎮 ألعاب تفاعلية (Interactive Games)

---

## 📡 Base URL
```
http://localhost:3000
```

---

## 🏠 Root Endpoint

```http
GET /
```

يرجع معلومات عن API والمميزات المتاحة.

---

## 💪 Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-05-30T15:56:07Z"
}
```

---

## 🎬 Animations (الرسوميات المتحركة)

### الحصول على جميع الإطارات
```http
GET /api/animations
```

### الحصول على إطار محدد
```http
GET /api/animations/:id
```

### الحصول على الإطارات حسب الفئة
```http
GET /api/animations/category/:category
```

**الفئات المتاحة:**
- `emoji` - رموز تعبيرية
- `badge` - شارات الأعضاء
- `effects` - تأثيرات خاصة

### الحصول على الصيغ المدعومة
```http
GET /api/animations/formats
```

---

## 🎁 Gifts (الهدايا المتحركة)

### الحصول على جميع الهدايا
```http
GET /api/gifts
```

**Parameters:**
- `category` - فئة الهدية (romantic, celebration, premium, fun)
- `rarity` - مستوى الندرة (common, rare, epic, legendary)
- `sort` - ترتيب (price-asc, price-desc)

### الحصول على هدية محددة
```http
GET /api/gifts/:id
```

### الحصول على الهدايا حسب الفئة
```http
GET /api/gifts/category/:category
```

---

## ✨ Effects (التأثيرات)

### الحصول على جميع التأثيرات
```http
GET /api/effects
```

### الحصول على التأثيرات حسب النوع
```http
GET /api/effects/:type
```

**الأنواع المتاحة:**
- `entrance` - تأثيرات الدخول
- `exit` - تأثيرات الخروج
- `idle` - تأثيرات الانتظار

### الحصول على مرفق التأثير
```http
GET /api/effects/:type/:id/asset
```

---

## 🎮 Games (الألعاب التفاعلية)

### الحصول على جميع الألعاب
```http
GET /api/games
```

**Parameters:**
- `type` - نوع اللعبة (spin, dice, card, scratch, bomb, speed, quiz, lottery)
- `difficulty` - مستوى الصعوبة (easy, medium, hard)

### الحصول على لعبة محددة
```http
GET /api/games/:id
```

### الحصول على الألعاب حسب النوع
```http
GET /api/games/type/:type
```

### تشغيل اللعبة
```http
POST /api/games/:id/play
```

**Body:**
```json
{
  "userId": "string",
  "betAmount": "number"
}
```

---

## 📊 Response Format

جميع الاستجابات تتبع الصيغة التالية:

```json
{
  "success": true|false,
  "data": {},
  "error": "optional error message",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## ✅ Status Codes

| Code | Meaning |
|------|----------|
| 200 | نجح الطلب ✅ |
| 404 | المورد غير موجود ❌ |
| 500 | خطأ في الخادم ❌ |

---

## 🔐 Headers

جميع الطلبات يجب أن تتضمن:

```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## 📚 Documentation

للمزيد من المعلومات:
- [Animations Documentation](./API.md)
- [Games Documentation](./GAMES.md)
- [Architecture](./ARCHITECTURE.md)

---

## 💡 Quick Examples

### مثال 1: الحصول على هدايا رومانسية
```bash
curl "http://localhost:3000/api/gifts?category=romantic&sort=price-asc"
```

### مثال 2: تشغيل لعبة دوران
```bash
curl -X POST http://localhost:3000/api/games/game-spin-001/play \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","betAmount":10}'
```

### مثال 3: الحصول على إطارات تعبيرية
```bash
curl "http://localhost:3000/api/animations/category/emoji"
```

---

## 🎯 Integration Example

```javascript
// Fetch all games
async function loadGames() {
  const response = await fetch('http://localhost:3000/api/games');
  const data = await response.json();
  console.log(data.games);
}

// Play a game
async function playGame(gameId, userId, betAmount) {
  const response = await fetch(
    `http://localhost:3000/api/games/${gameId}/play`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, betAmount })
    }
  );
  const result = await response.json();
  return result;
}
```
