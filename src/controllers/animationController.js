// Animation Frames Controller

const mockFrames = [
  {
    id: 'frame-001',
    name: 'Smile Animation',
    description: 'Animated smiling face frame',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/smile-animation.png',
    url_alt: '/frames/webp/smile-animation.webp',
    duration: 1500,
    transparent: true,
    size: { width: 256, height: 256 }
  },
  {
    id: 'frame-002',
    name: 'Heart Animation',
    description: 'Animated heart frame',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/heart-animation.png',
    url_alt: '/frames/webp/heart-animation.webp',
    duration: 2000,
    transparent: true,
    size: { width: 256, height: 256 }
  },
  {
    id: 'frame-003',
    name: 'Wave Animation',
    description: 'Animated wave frame',
    format: 'PNG',
    format_alt: 'WebP',
    url: '/frames/png/wave-animation.png',
    url_alt: '/frames/webp/wave-animation.webp',
    duration: 1000,
    transparent: true,
    size: { width: 256, height: 256 }
  }
];

export const getAllFrames = (req, res) => {
  try {
    res.json({
      success: true,
      total: mockFrames.length,
      frames: mockFrames
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
