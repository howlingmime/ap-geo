import { units } from '../data/units';

function Dashboard({ progress, levelInfo, onSelectUnit, getUnitAccuracy, getWeakestUnits }) {
  const weakestUnits = getWeakestUnits();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🌍 AP Human Geography</h1>
        <p className="tagline">Master the exam, one concept at a time!</p>
      </div>

      <div className="stats-row">
        <div className="stat-card level-card">
          <div className="level-badge">
            <span className="level-number">{levelInfo.level}</span>
            <span className="level-label">LEVEL</span>
          </div>
          <div className="xp-bar">
            <div
              className="xp-fill"
              style={{ width: `${(levelInfo.currentXp / levelInfo.xpForNextLevel) * 100}%` }}
            />
          </div>
          <div className="xp-text">
            {levelInfo.currentXp} / {levelInfo.xpForNextLevel} XP
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{progress.streakDays}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{progress.totalQuizzesTaken}</div>
          <div className="stat-label">Quizzes</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">
            {progress.totalQuestionsAnswered > 0
              ? Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100)
              : 0}%
          </div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>

      {weakestUnits.length > 0 && (
        <div className="focus-section">
          <h3>📌 Suggested Focus Areas</h3>
          <div className="focus-units">
            {weakestUnits.map(({ unitId, accuracy }) => {
              const unit = units.find(u => u.id === unitId);
              return (
                <div
                  key={unitId}
                  className="focus-unit"
                  onClick={() => onSelectUnit(unitId)}
                  style={{ borderColor: unit?.color }}
                >
                  <span className="focus-emoji">{unit?.emoji}</span>
                  <span className="focus-name">Unit {unitId}</span>
                  <span className="focus-accuracy" style={{ color: accuracy < 60 ? '#EF4444' : '#F59E0B' }}>
                    {Math.round(accuracy)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="units-section">
        <h2>📚 Study Units</h2>
        <div className="units-grid">
          {units.map(unit => {
            const accuracy = getUnitAccuracy(unit.id);
            const unitProgress = progress.unitProgress[unit.id];

            return (
              <div
                key={unit.id}
                className="unit-card"
                onClick={() => onSelectUnit(unit.id)}
                style={{ '--unit-color': unit.color }}
              >
                <div className="unit-card-header" style={{ backgroundColor: unit.color }}>
                  <span className="unit-emoji">{unit.emoji}</span>
                  <span className="unit-number">Unit {unit.id}</span>
                  <span className="unit-weight">{unit.weight}</span>
                </div>
                <div className="unit-card-body">
                  <h3 className="unit-title">{unit.title}</h3>
                  <p className="unit-desc">{unit.description}</p>
                  <div className="unit-stats">
                    {unitProgress.quizzesTaken > 0 ? (
                      <>
                        <div className="unit-stat">
                          <span className="unit-stat-value">{unitProgress.quizzesTaken}</span>
                          <span className="unit-stat-label">quizzes</span>
                        </div>
                        <div className="unit-stat">
                          <span className="unit-stat-value" style={{ color: accuracy >= 70 ? '#10B981' : accuracy >= 50 ? '#F59E0B' : '#EF4444' }}>
                            {accuracy}%
                          </span>
                          <span className="unit-stat-label">accuracy</span>
                        </div>
                      </>
                    ) : (
                      <div className="unit-stat not-started">Not started yet</div>
                    )}
                  </div>
                </div>
                <div className="unit-card-footer">
                  <span className="study-prompt">Click to study →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="achievements-preview">
        <h3>🏆 Recent Achievements</h3>
        <div className="achievement-icons">
          {progress.achievements.length > 0 ? (
            progress.achievements.slice(-5).map(id => {
              const achievementEmojis = {
                first_quiz: '🎯',
                perfect_quiz: '💯',
                streak_3: '🔥',
                streak_7: '⚡',
                all_units: '🌍',
                flashcard_master: '🃏',
                quiz_veteran: '🏆',
                century: '💪',
                geographer: '🗺️',
                expert: '🎓'
              };
              return (
                <span key={id} className="achievement-icon">{achievementEmojis[id]}</span>
              );
            })
          ) : (
            <span className="no-achievements">Complete activities to earn achievements!</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
