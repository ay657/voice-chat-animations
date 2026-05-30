// Entry Effects Controller

const mockEffects = {
  entrance: [
    {
      id: 'entrance-001',
      name: 'Fade In',
      description: 'Smooth fade in effect',
      format: 'SVG',
      svg_url: '/effects/svg/fade-in.svg',
      png_url: '/effects/png/fade-in-frame.png',
      duration: 800,
      easing: 'ease-in-out'
    },
    {
      id: 'entrance-002',
      name: 'Slide In',
      description: 'Slide in from left effect',
      format: 'SVG',
      svg_url: '/effects/svg/slide-in.svg',
      png_url: '/effects/png/slide-in-frame.png',
      duration: 600,
      easing: 'ease-out'
    }
  ],
  exit: [
    {
      id: 'exit-001',
      name: 'Fade Out',
      description: 'Smooth fade out effect',
      format: 'SVG',
      svg_url: '/effects/svg/fade-out.svg',
      png_url: '/effects/png/fade-out-frame.png',
      duration: 800,
      easing: 'ease-in-out'
    }
  ],
  idle: [
    {
      id: 'idle-001',
      name: 'Pulse',
      description: 'Subtle pulse effect',
      format: 'SVG',
      svg_url: '/effects/svg/pulse.svg',
      duration: 2000,
      easing: 'ease-in-out',
      loop: true
    }
  ]
};

export const getAllEffects = (req, res) => {
  try {
    const allEffects = [];
    for (const [type, effects] of Object.entries(mockEffects)) {
      allEffects.push(...effects.map(e => ({ ...e, type })));
    }
    
    res.json({
      success: true,
      total: allEffects.length,
      effects: allEffects,
      categories: Object.keys(mockEffects)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEffectsByType = (req, res) => {
  try {
    const { type } = req.params;
    const effects = mockEffects[type];
    
    if (!effects) {
      return res.status(404).json({
        success: false,
        error: `Effect type '${type}' not found`,
        available_types: Object.keys(mockEffects)
      });
    }
    
    res.json({
      success: true,
      type,
      total: effects.length,
      effects
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEffectAsset = (req, res) => {
  try {
    const { type, id } = req.params;
    const effects = mockEffects[type];
    
    if (!effects) {
      return res.status(404).json({
        success: false,
        error: `Effect type '${type}' not found`
      });
    }
    
    const effect = effects.find(e => e.id === id);
    
    if (!effect) {
      return res.status(404).json({
        success: false,
        error: `Effect with ID '${id}' not found in type '${type}'`
      });
    }
    
    res.json({
      success: true,
      effect: { ...effect, type },
      asset_formats: ['SVG', 'PNG']
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
