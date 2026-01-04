import { units } from '../data/units';

function UnitMenu({ unitId, onBack, onStartQuiz, onStartFlashcards, onStartGuide, unitAccuracy }) {
  const unit = units.find(u => u.id === unitId);

  if (!unit) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="unit-menu">
      <div className="unit-menu-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
      </div>

      <div className="unit-hero" style={{ backgroundColor: unit.color }}>
        <div className="unit-hero-emoji">{unit.emoji}</div>
        <div className="unit-hero-info">
          <span className="unit-hero-number">Unit {unit.id}</span>
          <h1 className="unit-hero-title">{unit.title}</h1>
          <p className="unit-hero-weight">Exam Weight: {unit.weight}</p>
        </div>
      </div>

      {unitAccuracy > 0 && (
        <div className="unit-accuracy-display">
          <span>Your Accuracy:</span>
          <span className={`accuracy-value ${unitAccuracy >= 70 ? 'good' : unitAccuracy >= 50 ? 'ok' : 'needs-work'}`}>
            {unitAccuracy}%
          </span>
        </div>
      )}

      <div className="unit-menu-options">
        <div className="menu-option" onClick={() => onStartQuiz(unitId)}>
          <div className="option-icon">📝</div>
          <div className="option-content">
            <h3>Take Quiz</h3>
            <p>Test your knowledge with practice questions</p>
          </div>
          <div className="option-arrow">→</div>
        </div>

        <div className="menu-option" onClick={() => onStartFlashcards(unitId)}>
          <div className="option-icon">🃏</div>
          <div className="option-content">
            <h3>Flashcards</h3>
            <p>Study {unit.concepts.length} key terms and definitions</p>
          </div>
          <div className="option-arrow">→</div>
        </div>

        <div className="menu-option" onClick={() => onStartGuide(unitId)}>
          <div className="option-icon">📚</div>
          <div className="option-content">
            <h3>Study Guide</h3>
            <p>Review key topics and vocabulary</p>
          </div>
          <div className="option-arrow">→</div>
        </div>
      </div>

      <div className="quick-facts">
        <h4>Quick Facts</h4>
        <ul>
          <li>📊 {unit.weight} of AP Exam</li>
          <li>📖 {unit.concepts.length} key vocabulary terms</li>
          <li>🎯 {unit.keyTopics.length} main topics to master</li>
        </ul>
      </div>
    </div>
  );
}

export default UnitMenu;
