// Animated Gifts Controller

const mockGifts = [
  {
    id: 'gift-001',
    name: 'Rose Gift',
    description: 'Beautiful animated rose gift',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/rose-gift.mp4',
    lottie_url: '/gifts/lottie/rose-gift.json',
    thumbnail: '/gifts/mp4/rose-gift-thumb.png',
    duration: 3000,
    color: '#FF69B4',
    category: 'romantic'
  },
  {
    id: 'gift-002',
    name: 'Fireworks Gift',
    description: 'Animated fireworks celebration gift',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/fireworks-gift.mp4',
    lottie_url: '/gifts/lottie/fireworks-gift.json',
    thumbnail: '/gifts/mp4/fireworks-gift-thumb.png',
    duration: 4000,
    color: '#FFD700',
    category: 'celebration'
  },
  {
    id: 'gift-003',
    name: 'Diamond Gift',
    description: 'Sparkling animated diamond gift',
    formats: ['MP4', 'Lottie'],
    mp4_url: '/gifts/mp4/diamond-gift.mp4',
    lottie_url: '/gifts/lottie/diamond-gift.json',
    thumbnail: '/gifts/mp4/diamond-gift-thumb.png',
    duration: 3500,
    color: '#00BFFF',
    category: 'premium'
  }
];

export const getAllGifts = (req, res) => {
  try {
    res.json({
      success: true,
      total: mockGifts.length,
      gifts: mockGifts
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
