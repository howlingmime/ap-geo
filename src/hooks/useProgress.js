import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ap-hug-progress';

const defaultProgress = {
  totalQuizzesTaken: 0,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  streakDays: 0,
  lastStudyDate: null,
  xp: 0,
  level: 1,
  achievements: [],
  unitProgress: {
    1: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    2: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    3: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    4: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    5: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    6: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 },
    7: { quizzesTaken: 0, correct: 0, total: 0, flashcardsStudied: 0 }
  },
  questionHistory: {} // Track individual question performance
};

const achievements = [
  { id: 'first_quiz', name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', xp: 50 },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', xp: 100 },
  { id: 'streak_3', name: 'On Fire', description: 'Study 3 days in a row', icon: '🔥', xp: 75 },
  { id: 'streak_7', name: 'Week Warrior', description: 'Study 7 days in a row', icon: '⚡', xp: 150 },
  { id: 'all_units', name: 'Well Rounded', description: 'Study all 7 units', icon: '🌍', xp: 200 },
  { id: 'flashcard_master', name: 'Card Shark', description: 'Study 50 flashcards', icon: '🃏', xp: 100 },
  { id: 'quiz_veteran', name: 'Quiz Veteran', description: 'Complete 10 quizzes', icon: '🏆', xp: 150 },
  { id: 'century', name: 'Century Club', description: 'Answer 100 questions', icon: '💪', xp: 200 },
  { id: 'geographer', name: 'Geographer', description: 'Reach level 5', icon: '🗺️', xp: 250 },
  { id: 'expert', name: 'AP Expert', description: 'Reach level 10', icon: '🎓', xp: 500 }
];

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return defaultProgress;
  });

  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const calculateLevel = (xp) => {
    // Each level requires 100 more XP than the previous
    let level = 1;
    let xpNeeded = 100;
    let totalXpNeeded = 0;

    while (totalXpNeeded + xpNeeded <= xp) {
      totalXpNeeded += xpNeeded;
      level++;
      xpNeeded = level * 100;
    }

    return {
      level,
      currentXp: xp - totalXpNeeded,
      xpForNextLevel: xpNeeded,
      totalXp: xp
    };
  };

  const checkAchievements = (newProgress) => {
    const earned = [...newProgress.achievements];
    let xpEarned = 0;

    achievements.forEach(achievement => {
      if (earned.includes(achievement.id)) return;

      let unlocked = false;

      switch (achievement.id) {
        case 'first_quiz':
          unlocked = newProgress.totalQuizzesTaken >= 1;
          break;
        case 'perfect_quiz':
          unlocked = newProgress.lastQuizPerfect;
          break;
        case 'streak_3':
          unlocked = newProgress.streakDays >= 3;
          break;
        case 'streak_7':
          unlocked = newProgress.streakDays >= 7;
          break;
        case 'all_units':
          unlocked = Object.values(newProgress.unitProgress).every(u => u.quizzesTaken > 0);
          break;
        case 'flashcard_master':
          unlocked = Object.values(newProgress.unitProgress).reduce((sum, u) => sum + u.flashcardsStudied, 0) >= 50;
          break;
        case 'quiz_veteran':
          unlocked = newProgress.totalQuizzesTaken >= 10;
          break;
        case 'century':
          unlocked = newProgress.totalQuestionsAnswered >= 100;
          break;
        case 'geographer':
          unlocked = calculateLevel(newProgress.xp).level >= 5;
          break;
        case 'expert':
          unlocked = calculateLevel(newProgress.xp).level >= 10;
          break;
      }

      if (unlocked) {
        earned.push(achievement.id);
        xpEarned += achievement.xp;
        setNewAchievement(achievement);
        setTimeout(() => setNewAchievement(null), 4000);
      }
    });

    return { achievements: earned, bonusXp: xpEarned };
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastDate = progress.lastStudyDate ? new Date(progress.lastStudyDate).toDateString() : null;

    if (lastDate === today) {
      return progress.streakDays;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === yesterday.toDateString()) {
      return progress.streakDays + 1;
    }

    return 1;
  };

  const recordQuizResult = (unitId, correct, total) => {
    const xpEarned = correct * 10 + (correct === total ? 25 : 0);
    const isPerfect = correct === total && total > 0;
    const newStreak = updateStreak();

    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalQuizzesTaken: prev.totalQuizzesTaken + 1,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + total,
        correctAnswers: prev.correctAnswers + correct,
        streakDays: newStreak,
        lastStudyDate: new Date().toISOString(),
        xp: prev.xp + xpEarned,
        lastQuizPerfect: isPerfect,
        unitProgress: {
          ...prev.unitProgress,
          [unitId]: {
            ...prev.unitProgress[unitId],
            quizzesTaken: prev.unitProgress[unitId].quizzesTaken + 1,
            correct: prev.unitProgress[unitId].correct + correct,
            total: prev.unitProgress[unitId].total + total
          }
        }
      };

      const { achievements: newAchievements, bonusXp } = checkAchievements(newProgress);
      newProgress.achievements = newAchievements;
      newProgress.xp += bonusXp;

      return newProgress;
    });
  };

  const recordFlashcardStudy = (unitId, count = 1) => {
    const xpEarned = count * 2;
    const newStreak = updateStreak();

    setProgress(prev => {
      const newProgress = {
        ...prev,
        streakDays: newStreak,
        lastStudyDate: new Date().toISOString(),
        xp: prev.xp + xpEarned,
        unitProgress: {
          ...prev.unitProgress,
          [unitId]: {
            ...prev.unitProgress[unitId],
            flashcardsStudied: prev.unitProgress[unitId].flashcardsStudied + count
          }
        }
      };

      const { achievements: newAchievements, bonusXp } = checkAchievements(newProgress);
      newProgress.achievements = newAchievements;
      newProgress.xp += bonusXp;

      return newProgress;
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getOverallAccuracy = () => {
    if (progress.totalQuestionsAnswered === 0) return 0;
    return Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100);
  };

  const getUnitAccuracy = (unitId) => {
    const unit = progress.unitProgress[unitId];
    if (!unit || unit.total === 0) return 0;
    return Math.round((unit.correct / unit.total) * 100);
  };

  const getWeakestUnits = () => {
    return Object.entries(progress.unitProgress)
      .filter(([_, data]) => data.total > 0)
      .map(([id, data]) => ({
        unitId: parseInt(id),
        accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);
  };

  return {
    progress,
    levelInfo: calculateLevel(progress.xp),
    achievements,
    newAchievement,
    recordQuizResult,
    recordFlashcardStudy,
    resetProgress,
    getOverallAccuracy,
    getUnitAccuracy,
    getWeakestUnits
  };
}

export default useProgress;
