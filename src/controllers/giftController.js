// Extended Animated Gifts Controller with pricing and categories

const mockGifts = [
  // Romantic Category
  {
    id: 'gift-001',
    name: 'Rose Gift',
    name_ar: 'هدية وردة',
    description: 'Beautiful animated rose gift',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/rose-gift.mp4',
    lottie_url: '/gifts/lottie/rose-gift.json',
    thumbnail: '/gifts/mp4/rose-gift-thumb.png',
    duration: 3000,
    color: '#FF69B4',
    category: 'romantic',
    price: 10,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-romantic.mp3'
  },
  {
    id: 'gift-002',
    name: 'Love Heart',
    name_ar: 'قلب الحب',
    description: 'Animated love heart with particles',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/love-heart.mp4',
    lottie_url: '/gifts/lottie/love-heart.json',
    thumbnail: '/gifts/mp4/love-heart-thumb.png',
    duration: 2500,
    color: '#FF1493',
    category: 'romantic',
    price: 15,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-romantic.mp3'
  },
  {
    id: 'gift-003',
    name: 'Cupid Arrow',
    name_ar: 'سهم كيوبيد',
    description: 'Romantic cupid arrow effect',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/cupid-arrow.mp4',
    lottie_url: '/gifts/lottie/cupid-arrow.json',
    thumbnail: '/gifts/mp4/cupid-arrow-thumb.png',
    duration: 3500,
    color: '#FF6B9D',
    category: 'romantic',
    price: 20,
    currency: 'coins',
    rarity: 'rare',
    particles: true,
    sound: '/sounds/gift-romantic.mp3'
  },

  // Celebration Category
  {
    id: 'gift-004',
    name: 'Fireworks',
    name_ar: 'ألعاب نارية',
    description: 'Animated fireworks celebration',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/fireworks.mp4',
    lottie_url: '/gifts/lottie/fireworks.json',
    thumbnail: '/gifts/mp4/fireworks-thumb.png',
    duration: 4000,
    color: '#FFD700',
    category: 'celebration',
    price: 25,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-celebration.mp3'
  },
  {
    id: 'gift-005',
    name: 'Balloons',
    name_ar: 'بالونات',
    description: 'Colorful floating balloons',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/balloons.mp4',
    lottie_url: '/gifts/lottie/balloons.json',
    thumbnail: '/gifts/mp4/balloons-thumb.png',
    duration: 3500,
    color: '#FF5733',
    category: 'celebration',
    price: 20,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-celebration.mp3'
  },
  {
    id: 'gift-006',
    name: 'Confetti',
    name_ar: 'الألوان المتطايرة',
    description: 'Festive confetti animation',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/confetti.mp4',
    lottie_url: '/gifts/lottie/confetti.json',
    thumbnail: '/gifts/mp4/confetti-thumb.png',
    duration: 3000,
    color: '#6C5CE7',
    category: 'celebration',
    price: 15,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-celebration.mp3'
  },

  // Premium Category
  {
    id: 'gift-007',
    name: 'Diamond',
    name_ar: 'ماس براق',
    description: 'Sparkling animated diamond',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/diamond.mp4',
    lottie_url: '/gifts/lottie/diamond.json',
    thumbnail: '/gifts/mp4/diamond-thumb.png',
    duration: 3500,
    color: '#00BFFF',
    category: 'premium',
    price: 50,
    currency: 'coins',
    rarity: 'rare',
    particles: true,
    sound: '/sounds/gift-premium.mp3'
  },
  {
    id: 'gift-008',
    name: 'Crown',
    name_ar: 'التاج الذهبي',
    description: 'Royal golden crown animation',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/crown.mp4',
    lottie_url: '/gifts/lottie/crown.json',
    thumbnail: '/gifts/mp4/crown-thumb.png',
    duration: 3000,
    color: '#FFD700',
    category: 'premium',
    price: 75,
    currency: 'coins',
    rarity: 'epic',
    particles: true,
    sound: '/sounds/gift-premium.mp3'
  },
  {
    id: 'gift-009',
    name: 'Dragon',
    name_ar: 'التنين الذهبي',
    description: 'Mystical golden dragon',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/dragon.mp4',
    lottie_url: '/gifts/lottie/dragon.json',
    thumbnail: '/gifts/mp4/dragon-thumb.png',
    duration: 5000,
    color: '#FF6B00',
    category: 'premium',
    price: 100,
    currency: 'coins',
    rarity: 'legendary',
    particles: true,
    sound: '/sounds/gift-legendary.mp3'
  },

  // Fun Category
  {
    id: 'gift-010',
    name: 'Laugh Emoji',
    name_ar: 'ضحك ومرح',
    description: 'Funny laughing face animation',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/laugh-emoji.mp4',
    lottie_url: '/gifts/lottie/laugh-emoji.json',
    thumbnail: '/gifts/mp4/laugh-emoji-thumb.png',
    duration: 2000,
    color: '#FFD700',
    category: 'fun',
    price: 5,
    currency: 'coins',
    rarity: 'common',
    particles: false,
    sound: '/sounds/gift-fun.mp3'
  },
  {
    id: 'gift-011',
    name: 'Ice Cream',
    name_ar: 'آيس كريم',
    description: 'Delicious ice cream animation',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/ice-cream.mp4',
    lottie_url: '/gifts/lottie/ice-cream.json',
    thumbnail: '/gifts/mp4/ice-cream-thumb.png',
    duration: 2500,
    color: '#FFA5C0',
    category: 'fun',
    price: 8,
    currency: 'coins',
    rarity: 'common',
    particles: false,
    sound: '/sounds/gift-fun.mp3'
  },
  {
    id: 'gift-012',
    name: 'Party Hat',
    name_ar: 'قبعة الحفلة',
    description: 'Colorful party hat celebration',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/party-hat.mp4',
    lottie_url: '/gifts/lottie/party-hat.json',
    thumbnail: '/gifts/mp4/party-hat-thumb.png',
    duration: 2500,
    color: '#FF4500',
    category: 'fun',
    price: 12,
    currency: 'coins',
    rarity: 'common',
    particles: true,
    sound: '/sounds/gift-fun.mp3'
  }
];

export const getAllGifts = (req, res) => {
  try {
    const { category, rarity, sort } = req.query;
    let filtered = [...mockGifts];

    if (category) {
      filtered = filtered.filter(g => g.category === category);
    }

    if (rarity) {
      filtered = filtered.filter(g => g.rarity === rarity);
    }

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    res.json({
      success: true,
      total: filtered.length,
      gifts: filtered,
      categories: [...new Set(mockGifts.map(g => g.category))],
      rarities: [...new Set(mockGifts.map(g => g.rarity))]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGiftById = (req, res) => {
  try {
    const { id } = req.params;
    const gift = mockGifts.find(g => g.id === id);
    
    if (!gift) {
      return res.status(404).json({
        success: false,
        error: `Gift with ID '${id}' not found`
      });
    }
    
    res.json({
      success: true,
      gift
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGiftsByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const gifts = mockGifts.filter(g => g.category === category);
    
    if (gifts.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No gifts found in category '${category}'`,
        available_categories: [...new Set(mockGifts.map(g => g.category))]
      });
    }
    
    res.json({
      success: true,
      category,
      total: gifts.length,
      gifts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFormats = (req, res) => {
  try {
    res.json({
      success: true,
      supported_formats: ['MP4', 'Lottie JSON'],
      description: 'Video and animation formats for gift animations',
      features: {
        MP4: { type: 'video', codec: 'H.264', alpha_channel: true },
        Lottie: { type: 'vector', framework: 'Lottie', scalable: true, lightweight: true }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
