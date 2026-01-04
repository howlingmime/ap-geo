import { units } from '../data/units';

function StudyGuide({ unitId, onBack, onStartQuiz, onStartFlashcards }) {
  const unit = units.find(u => u.id === unitId);

  if (!unit) {
    return <div className="loading">Loading study guide...</div>;
  }

  return (
    <div className="study-guide-container">
      <div className="study-guide-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="unit-badge large" style={{ backgroundColor: unit.color }}>
          {unit.emoji} Unit {unitId}: {unit.title}
        </div>
      </div>

      <div className="study-guide-content">
        <div className="guide-section overview">
          <h2>📚 Overview</h2>
          <p>{unit.description}</p>
          <div className="exam-weight">
            <span className="weight-label">AP Exam Weight:</span>
            <span className="weight-value" style={{ color: unit.color }}>{unit.weight}</span>
          </div>
        </div>

        <div className="guide-section key-topics">
          <h2>🎯 Key Topics</h2>
          <ul>
            {unit.keyTopics.map((topic, index) => (
              <li key={index}>
                <span className="topic-bullet" style={{ backgroundColor: unit.color }}>•</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="guide-section vocabulary">
          <h2>📖 Essential Vocabulary</h2>
          <div className="vocab-grid">
            {unit.concepts.map((concept, index) => (
              <div key={index} className="vocab-item">
                <div className="vocab-term" style={{ borderLeftColor: unit.color }}>
                  {concept.term}
                </div>
                <div className="vocab-definition">
                  {concept.definition}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="guide-section study-tips">
          <h2>💡 Study Tips for Unit {unitId}</h2>
          <div className="tips-grid">
            {unitId === 1 && (
              <>
                <div className="tip">Practice reading maps at different scales</div>
                <div className="tip">Know the difference between site and situation</div>
                <div className="tip">Understand how GIS layers work together</div>
              </>
            )}
            {unitId === 2 && (
              <>
                <div className="tip">Memorize the characteristics of each DTM stage</div>
                <div className="tip">Practice reading population pyramids</div>
                <div className="tip">Know examples of push and pull factors</div>
              </>
            )}
            {unitId === 3 && (
              <>
                <div className="tip">Distinguish between types of diffusion with examples</div>
                <div className="tip">Know major language families and distributions</div>
                <div className="tip">Understand the difference between universalizing and ethnic religions</div>
              </>
            )}
            {unitId === 4 && (
              <>
                <div className="tip">Practice identifying state shapes on maps</div>
                <div className="tip">Know examples of centripetal vs centrifugal forces</div>
                <div className="tip">Understand how boundary types affect regions</div>
              </>
            )}
            {unitId === 5 && (
              <>
                <div className="tip">Know the Von Thünen model rings and why they're ordered that way</div>
                <div className="tip">Distinguish between subsistence and commercial agriculture types</div>
                <div className="tip">Understand impacts of the Green Revolution</div>
              </>
            )}
            {unitId === 6 && (
              <>
                <div className="tip">Know all urban models and their key differences</div>
                <div className="tip">Understand causes and effects of gentrification</div>
                <div className="tip">Compare urban challenges in developed vs developing countries</div>
              </>
            )}
            {unitId === 7 && (
              <>
                <div className="tip">Understand Weber's Least Cost Theory factors</div>
                <div className="tip">Know the economic sectors and examples of each</div>
                <div className="tip">Compare development theories and their criticisms</div>
              </>
            )}
          </div>
        </div>

        <div className="study-actions">
          <button
            className="btn btn-primary action-btn"
            style={{ backgroundColor: unit.color }}
            onClick={() => onStartQuiz(unitId)}
          >
            📝 Take Quiz
          </button>
          <button
            className="btn btn-secondary action-btn"
            onClick={() => onStartFlashcards(unitId)}
          >
            🃏 Study Flashcards
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyGuide;
