import { useState, useEffect } from 'react';
import { units } from '../data/units';

function Flashcards({ unitId, onBack, onStudy }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState([]);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [showComplete, setShowComplete] = useState(false);

  const unit = units.find(u => u.id === unitId);

  useEffect(() => {
    if (unit) {
      const shuffled = [...unit.concepts].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  }, [unitId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !studiedCards.has(currentCard)) {
      setStudiedCards(new Set([...studiedCards, currentCard]));
      onStudy(unitId, 1);
    }
  };

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setShowComplete(true);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    setShowComplete(false);
  };

  if (!unit || cards.length === 0) {
    return <div className="loading">Loading flashcards...</div>;
  }

  if (showComplete) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-complete">
          <div className="complete-emoji">🎉</div>
          <h2>Deck Complete!</h2>
          <p>You've gone through all {cards.length} cards!</p>
          <div className="xp-earned">+{studiedCards.size * 2} XP earned!</div>
          <div className="flashcard-complete-actions">
            <button className="btn btn-primary" onClick={shuffleCards}>
              Study Again
            </button>
            <button className="btn btn-secondary" onClick={onBack}>
              Back to Units
            </button>
          </div>
        </div>
      </div>
    );
  }

  const card = cards[currentCard];

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="unit-badge" style={{ backgroundColor: unit.color }}>
          {unit.emoji} Unit {unitId}
        </div>
        <div className="card-count">
          {currentCard + 1} / {cards.length}
        </div>
      </div>

      <div className="flashcard-progress">
        <div
          className="flashcard-progress-fill"
          style={{
            width: `${((currentCard + 1) / cards.length) * 100}%`,
            backgroundColor: unit.color
          }}
        />
      </div>

      <div className="flashcard-area">
        <button
          className="nav-btn prev-btn"
          onClick={prevCard}
          disabled={currentCard === 0}
        >
          ‹
        </button>

        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front" style={{ borderColor: unit.color }}>
              <div className="card-label">TERM</div>
              <div className="card-content">{card.term}</div>
              <div className="flip-hint">Click to flip</div>
            </div>
            <div className="flashcard-back" style={{ backgroundColor: unit.color }}>
              <div className="card-label">DEFINITION</div>
              <div className="card-content">{card.definition}</div>
              <div className="flip-hint">Click to flip back</div>
            </div>
          </div>
        </div>

        <button
          className="nav-btn next-btn"
          onClick={nextCard}
        >
          ›
        </button>
      </div>

      <div className="flashcard-actions">
        <button className="btn btn-secondary" onClick={shuffleCards}>
          🔀 Shuffle
        </button>
        <div className="studied-count">
          {studiedCards.size} cards studied
        </div>
      </div>

      <div className="keyboard-hints">
        <span>← → to navigate</span>
        <span>Space to flip</span>
      </div>
    </div>
  );
}

export default Flashcards;
