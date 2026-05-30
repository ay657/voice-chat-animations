# 🎮 Games Library Documentation

## 📋 نقاط الوصول (Endpoints)

### Base URL
```
http://localhost:3000/api/games
```

---

## 🎰 الحصول على جميع الألعاب

```http
GET /api/games
```

**Parameters:**
- `type` - نوع اللعبة (spin, dice, card, scratch, bomb, speed, quiz, lottery)
- `difficulty` - مستوى الصعوبة (easy, medium, hard)

**Example:**
```http
GET /api/games?type=spin&difficulty=easy
```

**Response:**
```json
{
  "success": true,
  "total": 2,
  "games": [
    {
      "id": "game-spin-001",
      "name": "Lucky Spin",
      "name_ar": "لعبة الدوران المحظوظة",
      "description": "Spin the wheel to win coins",
      "type": "spin",
      "difficulty": "easy",
      "min_players": 1,
      "max_players": 100,
      "duration": 10000,
      "rewards": {
        "min_coins": 10,
        "max_coins": 100,
        "drop_rate": 50
      },
      "icon": "🎡",
      "thumbnail": "/games/spin/lucky-spin.png"
    }
  ],
  "game_types": ["spin", "dice", "card", "scratch", "bomb", "speed", "quiz", "lottery"],
  "difficulties": ["easy", "medium", "hard"]
}
```

---

## 🎲 الحصول على لعبة محددة

```http
GET /api/games/:id
```

**Example:**
```http
GET /api/games/game-spin-001
```

---

## 🎯 الحصول على الألعاب حسب النوع

```http
GET /api/games/type/:type
```

**Example:**
```http
GET /api/games/type/dice
```

---

## ▶️ تشغيل اللعبة

```http
POST /api/games/:id/play
```

**Body:**
```json
{
  "userId": "user123",
  "betAmount": 10
}
```

**Response:**
```json
{
  "success": true,
  "gameId": "game-spin-001",
  "gameName": "Lucky Spin",
  "userId": "user123",
  "betAmount": 10,
  "timestamp": "2026-05-30T15:56:07Z",
  "result": {
    "type": "spin",
    "rotation": 245.67,
    "winCoins": 75,
    "isWinner": true
  },
  "status": "completed"
}
```

---

## 🎮 أنواع الألعاب

### 1️⃣ لعبة الدوران (Spin Game)
```javascript
{
  "type": "spin",
  "rotation": 245.67,      // زاوية الدوران
  "winCoins": 75,           // العملات المكسبة
  "isWinner": true          // هل فاز
}
```

### 2️⃣ لعبة النرد (Dice Game)
```javascript
{
  "type": "dice",
  "dice1": 4,               // النرد الأول
  "dice2": 5,               // النرد الثاني
  "total": 9,               // المجموع
  "winCoins": 180            // العملات المكسبة
}
```

### 3️⃣ لعبة البطاقات (Card Game)
```javascript
{
  "type": "card",
  "selectedCard": 2,        // رقم البطاقة المختارة
  "winCoins": 120,          // العملات المكسبة
  "isWinner": true          // هل فاز
}
```

### 4️⃣ لعبة الحك (Scratch Game)
```javascript
{
  "type": "scratch",
  "revealed": 1,            // عدد العناصر المكشوفة
  "winCoins": 85,           // العملات المكسبة
  "isWinner": true          // هل فاز
}
```

### 5️⃣ لعبة التفجير (Bomb Game)
```javascript
{
  "type": "bomb",
  "selected": 3,            // الخيار المختار
  "bombPosition": 7,        // موقع القنبلة
  "isWinner": true,         // هل تجنب القنبلة
  "winCoins": 200           // العملات المكسبة
}
```

### 6️⃣ لعبة السرعة (Speed Game)
```javascript
{
  "type": "speed",
  "taps": 67,               // عدد النقرات
  "winCoins": 134           // العملات المكسبة
}
```

### 7️⃣ لعبة الأسئلة (Quiz Game)
```javascript
{
  "type": "quiz",
  "correctAnswers": 4,      // عدد الإجابات الصحيحة
  "totalQuestions": 5,      // إجمالي الأسئلة
  "winCoins": 80            // العملات المكسبة
}
```

### 8️⃣ لعبة اليانصيب (Lottery Game)
```javascript
{
  "type": "lottery",
  "isWinner": false,        // هل فاز
  "winCoins": 0             // العملات المكسبة
}
```

---

## 📊 أنواع الألعاب المتاحة

| النوع | الصعوبة | لاعبين | المكافأة |
|------|--------|--------|--------|
| Spin | Easy | 1-100 | 10-100 |
| Spin | Medium | 1-100 | 50-500 |
| Dice | Easy | 1-50 | 10-60 |
| Dice | Medium | 2-50 | 20-120 |
| Card | Easy | 1-100 | 15-150 |
| Card | Hard | 1 | 50-300 |
| Scratch | Easy | 1-100 | 5-100 |
| Bomb | Medium | 1-50 | 25-250 |
| Speed | Medium | 1 | 10-200 |
| Quiz | Medium | 1-100 | 20-200 |
| Lottery | Easy | 2+ | Variable |

---

## 💡 أمثلة على الاستخدام

### بـ JavaScript

```javascript
// الحصول على جميع ألعاب الدوران
fetch('http://localhost:3000/api/games?type=spin')
  .then(res => res.json())
  .then(data => console.log(data.games));

// تشغيل لعبة
fetch('http://localhost:3000/api/games/game-spin-001/play', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    betAmount: 10
  })
})
  .then(res => res.json())
  .then(result => {
    if (result.result.isWinner) {
      console.log(`🎉 فزت بـ ${result.result.winCoins} عملة!`);
    } else {
      console.log('❌ حاول مرة أخرى');
    }
  });
```

### بـ cURL

```bash
# الحصول على ألعاب النرد
curl http://localhost:3000/api/games/type/dice

# تشغيل لعبة
curl -X POST http://localhost:3000/api/games/game-dice-001/play \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","betAmount":10}'
```

---

## 🔧 خصائص اللعبة

```javascript
{
  "id": string,                    // معرف فريد
  "name": string,                  // اسم اللعبة (English)
  "name_ar": string,               // اسم اللعبة (Arabic)
  "description": string,           // الوصف
  "type": string,                  // نوع اللعبة
  "difficulty": string,            // مستوى الصعوبة
  "min_players": number,          // الحد الأدنى من اللاعبين
  "max_players": number,          // الحد الأقصى من اللاعبين
  "duration": number,             // مدة اللعبة (ميلي ثانية)
  "rewards": object,              // نظام المكافآت
  "icon": string,                 // رمز الإيموجي
  "thumbnail": string             // صورة مصغرة
}
```
