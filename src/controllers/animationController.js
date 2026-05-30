// Enhanced Animation Frames Controller with more options

const mockFrames = [
  // Emoji Frames
  {
    id: 'frame-emoji-001',
    name: 'Smile',
    name_ar: 'ابتسامة',
    description: 'Happy smiling face animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/smile.png',
    url_alt: '/frames/webp/smile.webp',
    duration: 1500,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'emoji',
    animation_type: 'bounce'
  },
  {
    id: 'frame-emoji-002',
    name: 'Heart',
    name_ar: 'قلب',
    description: 'Beating heart animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/heart.png',
    url_alt: '/frames/webp/heart.webp',
    duration: 1000,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'emoji',
    animation_type: 'pulse'
  },
  {
    id: 'frame-emoji-003',
    name: 'Star',
    name_ar: 'نجمة',
    description: 'Twinkling star animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/star.png',
    url_alt: '/frames/webp/star.webp',
    duration: 800,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'emoji',
    animation_type: 'twinkle'
  },
  {
    id: 'frame-emoji-004',
    name: 'Fire',
    name_ar: 'نار',
    description: 'Burning fire animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/fire.png',
    url_alt: '/frames/webp/fire.webp',
    duration: 1200,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'emoji',
    animation_type: 'flicker'
  },
  {
    id: 'frame-emoji-005',
    name: 'Thunder',
    name_ar: 'برق',
    description: 'Lightning bolt animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/thunder.png',
    url_alt: '/frames/webp/thunder.webp',
    duration: 600,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'emoji',
    animation_type: 'flash'
  },

  // Badge Frames
  {
    id: 'frame-badge-001',
    name: 'VIP Badge',
    name_ar: 'شارة VIP',
    description: 'VIP member badge animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/vip-badge.png',
    url_alt: '/frames/webp/vip-badge.webp',
    duration: 2000,
    transparent: true,
    size: { width: 128, height: 128 },
    category: 'badge',
    animation_type: 'rotate'
  },
  {
    id: 'frame-badge-002',
    name: 'Verified Badge',
    name_ar: 'شارة تحقق',
    description: 'Verified member badge',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/verified-badge.png',
    url_alt: '/frames/webp/verified-badge.webp',
    duration: 1500,
    transparent: true,
    size: { width: 128, height: 128 },
    category: 'badge',
    animation_type: 'glow'
  },
  {
    id: 'frame-badge-003',
    name: 'Streamer Badge',
    name_ar: 'شارة بث',
    description: 'Streamer badge animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/streamer-badge.png',
    url_alt: '/frames/webp/streamer-badge.webp',
    duration: 2000,
    transparent: true,
    size: { width: 128, height: 128 },
    category: 'badge',
    animation_type: 'pulse'
  },

  // Wave Frames
  {
    id: 'frame-wave-001',
    name: 'Wave',
    name_ar: 'موجة',
    description: 'Water wave animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/wave.png',
    url_alt: '/frames/webp/wave.webp',
    duration: 1000,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'effects',
    animation_type: 'wave'
  },
  {
    id: 'frame-wave-002',
    name: 'Sparkle',
    name_ar: 'برق',
    description: 'Sparkling effect animation',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/sparkle.png',
    url_alt: '/frames/webp/sparkle.webp',
    duration: 800,
    transparent: true,
    size: { width: 256, height: 256 },
    category: 'effects',
    animation_type: 'sparkle'
  }
];

export const getAllFrames = (req, res) => {
  try {
    const { category, animation_type } = req.query;
    let filtered = [...mockFrames];

    if (category) {
      filtered = filtered.filter(f => f.category === category);
    }

    if (animation_type) {
      filtered = filtered.filter(f => f.animation_type === animation_type);
    }

    res.json({
      success: true,
      total: filtered.length,
      frames: filtered,
      categories: [...new Set(mockFrames.map(f => f.category))],
      animation_types: [...new Set(mockFrames.map(f => f.animation_type))]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFrameById = (req, res) => {
  try {
    const { id } = req.params;
    const frame = mockFrames.find(f => f.id === id);
    
    if (!frame) {
      return res.status(404).json({
        success: false,
        error: `Frame with ID '${id}' not found`
      });
    }
    
    res.json({
      success: true,
      frame
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFramesByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const frames = mockFrames.filter(f => f.category === category);
    
    if (frames.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No frames found in category '${category}'`,
        available_categories: [...new Set(mockFrames.map(f => f.category))]
      });
    }
    
    res.json({
      success: true,
      category,
      total: frames.length,
      frames
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFormats = (req, res) => {
  try {
    res.json({
      success: true,
      supported_formats: ['PNG', 'WebP'],
      description: 'Transparent image formats for animation frames',
      features: {
        PNG: { transparent: true, compression: 'lossless' },
        WebP: { transparent: true, compression: 'lossy/lossless', optimized: true }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
