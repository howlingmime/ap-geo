import { useState } from 'react';
import { units } from '../data/units';
import { getPromptForUnit, gradeResponse } from '../data/writtenPrompts';
import confetti from 'canvas-confetti';

function WrittenPrompt({ unitId, onBack }) {
  const unit = units.find((u) => u.id === unitId);
  const prompt = getPromptForUnit(unitId);

  const [response, setResponse] = useState('');
  const [result, setResult] = useState(null);

  if (!prompt) {
    return (
      <div className="written-container">
        <div className="written-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
        </div>
        <div className="loading">No written prompt available for this unit yet.</div>
      </div>
    );
  }

  const handleSubmit = () => {
    const graded = gradeResponse(prompt, response);
    setResult(graded);
    if (graded.percentage >= 80) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setResponse('');
    setResult(null);
  };

  const wordCount = response.trim() ? response.trim().split(/\s+/).length : 0;

  return (
    <div className="written-container">
      <div className="written-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="unit-badge" style={{ backgroundColor: unit?.color }}>
          {unit?.emoji} Unit {unitId}
        </div>
        <div className="written-progress">FRQ Practice</div>
      </div>

      <div className="written-prompt-card">
        <div className="written-label">Free-Response Prompt</div>
        <p className="written-prompt-text">{prompt.prompt}</p>
      </div>

      {!result && (
        <>
          <textarea
            className="written-textarea"
            placeholder="Type your response here. Be specific — use AP HuG vocabulary, define key terms, and give concrete examples."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={12}
          />
          <div className="written-meta">
            <span className="word-count">{wordCount} words</span>
            <div className="written-actions">
              <button className="btn btn-secondary" onClick={handleReset} disabled={!response}>
                Clear
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={response.trim().length === 0}
              >
                Submit for Grading
              </button>
            </div>
          </div>
        </>
      )}

      {result && (
        <div className="written-result">
          <div className="written-score-row">
            <div className="written-score-block">
              <div className="written-score">
                {result.score}<span className="score-divider">/</span>{result.total}
              </div>
              <div className="written-percentage">{result.percentage}%</div>
            </div>
            <p className="written-feedback">{result.feedback}</p>
          </div>

          {result.lengthNote && (
            <div className="written-length-note">{result.lengthNote}</div>
          )}

          <div className="rubric-section">
            <h4>What you addressed</h4>
            {result.hits.length === 0 ? (
              <p className="rubric-empty">No rubric points addressed yet — try again with more specific terms.</p>
            ) : (
              <ul className="rubric-list hits">
                {result.hits.map((h, i) => (
                  <li key={i}><span className="rubric-mark">✓</span>{h}</li>
                ))}
              </ul>
            )}
          </div>

          {result.misses.length > 0 && (
            <div className="rubric-section">
              <h4>What was missing</h4>
              <ul className="rubric-list misses">
                {result.misses.map((m, i) => (
                  <li key={i}><span className="rubric-mark">✗</span>{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rubric-section guidance">
            <h4>Reader's Note</h4>
            <p>{prompt.guidance}</p>
          </div>

          <div className="written-result-actions">
            <button className="btn btn-secondary" onClick={handleReset}>
              Try Again
            </button>
            <button className="btn btn-primary" onClick={onBack}>
              Back to Unit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WrittenPrompt;
