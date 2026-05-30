// Interactive Games Library for Voice Chat Applications

const games = [
  // Spin Games
  {
    id: 'game-spin-001',
    name: 'Lucky Spin',
    name_ar: 'لعبة الدوران المحظوظة',
    description: 'Spin the wheel to win coins',
    type: 'spin',
    difficulty: 'easy',
    min_players: 1,
    max_players: 100,
    duration: 10000,
    rewards: {
      min_coins: 10,
      max_coins: 100,
      drop_rate: 50
    },
    icon: '🎡',
    thumbnail: '/games/spin/lucky-spin.png'
  },
  {
    id: 'game-spin-002',
    name: 'Golden Wheel',
    name_ar: 'عجلة ذهبية',
    description: 'Spin the golden wheel for premium rewards',
    type: 'spin',
    difficulty: 'medium',
    min_players: 1,
    max_players: 100,
    duration: 15000,
    rewards: {
      min_coins: 50,
      max_coins: 500,
      drop_rate: 30
    },
    icon: '����',
    thumbnail: '/games/spin/golden-wheel.png'
  },

  // Dice Games
  {
    id: 'game-dice-001',
    name: 'Lucky Dice',
    name_ar: 'لعبة النرد المحظوظة',
    description: 'Roll the dice and win coins',
    type: 'dice',
    difficulty: 'easy',
    min_players: 1,
    max_players: 50,
    duration: 5000,
    rewards: {
      base_coins: 10,
      multiplier: true,
      max_multiplier: 6
    },
    icon: '🎲',
    thumbnail: '/games/dice/lucky-dice.png'
  },
  {
    id: 'game-dice-002',
    name: 'Double Dice',
    name_ar: 'النرد المزدوج',
    description: 'Roll two dice for bigger rewards',
    type: 'dice',
    difficulty: 'medium',
    min_players: 2,
    max_players: 50,
    duration: 8000,
    rewards: {
      base_coins: 20,
      multiplier: true,
      max_multiplier: 12
    },
    icon: '🎲🎲',
    thumbnail: '/games/dice/double-dice.png'
  },

  // Card Games
  {
    id: 'game-card-001',
    name: 'Card Picker',
    name_ar: 'لعبة اختيار البطاقات',
    description: 'Pick a lucky card from 5 cards',
    type: 'card',
    difficulty: 'easy',
    min_players: 1,
    max_players: 100,
    duration: 12000,
    rewards: {
      min_coins: 15,
      max_coins: 150,
      cards_count: 5
    },
    icon: '🃏',
    thumbnail: '/games/card/card-picker.png'
  },
  {
    id: 'game-card-002',
    name: 'Memory Cards',
    name_ar: 'لعبة تذكر البطاقات',
    description: 'Match pairs of cards to win',
    type: 'card',
    difficulty: 'hard',
    min_players: 1,
    max_players: 1,
    duration: 30000,
    rewards: {
      min_coins: 50,
      max_coins: 300,
      cards_count: 12
    },
    icon: '🎮',
    thumbnail: '/games/card/memory-cards.png'
  },

  // Scratch Games
  {
    id: 'game-scratch-001',
    name: 'Scratch Card',
    name_ar: 'بطاقة الحك',
    description: 'Scratch the card to reveal your reward',
    type: 'scratch',
    difficulty: 'easy',
    min_players: 1,
    max_players: 100,
    duration: 8000,
    rewards: {
      min_coins: 5,
      max_coins: 100,
      hidden_rewards: 3
    },
    icon: '🎫',
    thumbnail: '/games/scratch/scratch-card.png'
  },

  // Bomb Games
  {
    id: 'game-bomb-001',
    name: 'Bomb Game',
    name_ar: 'لعبة التفجير',
    description: 'Avoid the bomb and win coins',
    type: 'bomb',
    difficulty: 'medium',
    min_players: 1,
    max_players: 50,
    duration: 20000,
    rewards: {
      min_coins: 25,
      max_coins: 250,
      bomb_count: 1,
      safe_count: 9
    },
    icon: '💣',
    thumbnail: '/games/bomb/bomb-game.png'
  },

  // Speed Games
  {
    id: 'game-speed-001',
    name: 'Speed Tap',
    name_ar: 'لعبة سرعة النقر',
    description: 'Tap as fast as you can in 10 seconds',
    type: 'speed',
    difficulty: 'medium',
    min_players: 1,
    max_players: 1,
    duration: 10000,
    rewards: {
      min_coins: 10,
      max_coins: 200,
      score_based: true
    },
    icon: '⚡',
    thumbnail: '/games/speed/speed-tap.png'
  },

  // Quiz Games
  {
    id: 'game-quiz-001',
    name: 'Quick Quiz',
    name_ar: 'لعبة الأسئلة السريعة',
    description: 'Answer questions correctly to win coins',
    type: 'quiz',
    difficulty: 'medium',
    min_players: 1,
    max_players: 100,
    duration: 15000,
    rewards: {
      per_correct_answer: 20,
      bonus_streak: true,
      max_coins: 200
    },
    icon: '❓',
    questions_count: 5,
    thumbnail: '/games/quiz/quick-quiz.png'
  },

  // Lottery Games
  {
    id: 'game-lottery-001',
    name: 'Lucky Lottery',
    name_ar: 'اليانصيب المحظوظة',
    description: 'Buy tickets and win big prizes',
    type: 'lottery',
    difficulty: 'easy',
    min_players: 2,
    max_players: 1000,
    duration: 60000,
    rewards: {
      ticket_cost: 10,
      max_prize: 1000,
      winner_percentage: 5
    },
    icon: '🎰',
    thumbnail: '/games/lottery/lucky-lottery.png'
  }
];

export const getAllGames = (req, res) => {
  try {
    const { type, difficulty } = req.query;
    let filtered = [...games];

    if (type) {
      filtered = filtered.filter(g => g.type === type);
    }

    if (difficulty) {
      filtered = filtered.filter(g => g.difficulty === difficulty);
    }

    res.json({
      success: true,
      total: filtered.length,
      games: filtered,
      game_types: [...new Set(games.map(g => g.type))],
      difficulties: [...new Set(games.map(g => g.difficulty))]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGameById = (req, res) => {
  try {
    const { id } = req.params;
    const game = games.find(g => g.id === id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        error: `Game with ID '${id}' not found`
      });
    }
    
    res.json({
      success: true,
      game
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGamesByType = (req, res) => {
  try {
    const { type } = req.params;
    const gamesByType = games.filter(g => g.type === type);
    
    if (gamesByType.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No games found with type '${type}'`,
        available_types: [...new Set(games.map(g => g.type))]
      });
    }
    
    res.json({
      success: true,
      type,
      total: gamesByType.length,
      games: gamesByType
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const playGame = (req, res) => {
  try {
    const { id } = req.params;
    const { userId, betAmount } = req.body;
    
    const game = games.find(g => g.id === id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        error: `Game with ID '${id}' not found`
      });
    }
    
    // Simulate game play
    const result = {
      success: true,
      gameId: id,
      gameName: game.name,
      userId,
      betAmount,
      timestamp: new Date().toISOString(),
      result: simulateGameResult(game),
      status: 'completed'
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

function simulateGameResult(game) {
  switch (game.type) {
    case 'spin':
      return {
        type: 'spin',
        rotation: Math.random() * 360,
        winCoins: Math.floor(Math.random() * (game.rewards.max_coins - game.rewards.min_coins + 1)) + game.rewards.min_coins,
        isWinner: Math.random() < (game.rewards.drop_rate / 100)
      };
    
    case 'dice':
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      return {
        type: 'dice',
        dice1,
        dice2,
        total: dice1 + dice2,
        winCoins: (dice1 + dice2) * game.rewards.base_coins
      };
    
    case 'card':
      return {
        type: 'card',
        selectedCard: Math.floor(Math.random() * game.rewards.cards_count),
        winCoins: Math.floor(Math.random() * (game.rewards.max_coins - game.rewards.min_coins + 1)) + game.rewards.min_coins,
        isWinner: Math.random() < 0.5
      };
    
    case 'scratch':
      return {
        type: 'scratch',
        revealed: Math.floor(Math.random() * game.rewards.hidden_rewards),
        winCoins: Math.floor(Math.random() * game.rewards.max_coins),
        isWinner: true
      };
    
    case 'bomb':
      return {
        type: 'bomb',
        selected: Math.floor(Math.random() * 10),
        bombPosition: Math.floor(Math.random() * 10),
        isWinner: Math.floor(Math.random() * 10) !== Math.floor(Math.random() * 10),
        winCoins: Math.floor(Math.random() * (game.rewards.max_coins - game.rewards.min_coins + 1)) + game.rewards.min_coins
      };
    
    case 'speed':
      const taps = Math.floor(Math.random() * 100) + 10;
      return {
        type: 'speed',
        taps,
        winCoins: Math.floor(taps * 2)
      };
    
    case 'quiz':
      const correctAnswers = Math.floor(Math.random() * game.questions_count);
      return {
        type: 'quiz',
        correctAnswers,
        totalQuestions: game.questions_count,
        winCoins: correctAnswers * game.rewards.per_correct_answer
      };
    
    case 'lottery':
      return {
        type: 'lottery',
        isWinner: Math.random() < (game.rewards.winner_percentage / 100),
        winCoins: Math.random() < 0.01 ? game.rewards.max_prize : 0
      };
    
    default:
      return { type: game.type, isWinner: false, winCoins: 0 };
  }
}
