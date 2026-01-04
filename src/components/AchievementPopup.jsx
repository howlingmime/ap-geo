function AchievementPopup({ achievement }) {
  if (!achievement) return null;

  return (
    <div className="achievement-popup">
      <div className="achievement-content">
        <div className="achievement-icon">{achievement.icon}</div>
        <div className="achievement-text">
          <div className="achievement-label">Achievement Unlocked!</div>
          <div className="achievement-name">{achievement.name}</div>
          <div className="achievement-desc">{achievement.description}</div>
          <div className="achievement-xp">+{achievement.xp} XP</div>
        </div>
      </div>
    </div>
  );
}

export default AchievementPopup;
