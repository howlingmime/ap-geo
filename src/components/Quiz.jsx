import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { units } from '../data/units';
import confetti from 'canvas-confetti';

function Quiz({ unitId, onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);

  const unit = units.find(u => u.id === unitId);

  useEffect(() => {
    // Get questions for this unit and shuffle them
    const unitQuestions = questions.filter(q => q.unit === unitId);
    const shuffled = [...unitQuestions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, Math.min(10, shuffled.length)));
  }, [unitId]);

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === quizQuestions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);

      if (streak + 1 >= 3) {
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 1500);
      }

      // Mini celebration for correct answers
      if (streak + 1 >= 3) {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);

      // Celebration for completing quiz
      const finalScore = score;
      const total = quizQuestions.length;
      const percentage = (finalScore / total) * 100;

      if (percentage >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      onComplete(unitId, score + (selectedAnswer === quizQuestions[currentQuestion]?.correct ? 1 : 0), quizQuestions.length);
    }
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (quizComplete) {
    const finalScore = score;
    const total = quizQuestions.length;
    const percentage = Math.round((finalScore / total) * 100);

    let message, emoji;
    if (percentage === 100) {
      message = "PERFECT! You're an AP HuG master!";
      emoji = "🏆";
    } else if (percentage >= 80) {
      message = "Excellent work! You really know your stuff!";
      emoji = "🌟";
    } else if (percentage >= 60) {
      message = "Good job! Keep studying to improve!";
      emoji = "👍";
    } else {
      message = "Keep practicing! You'll get there!";
      emoji = "💪";
    }

    return (
      <div className="quiz-container">
        <div className="quiz-complete">
          <div className="result-emoji">{emoji}</div>
          <h2>Quiz Complete!</h2>
          <div className="final-score">
            <span className="score-number">{finalScore}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{total}</span>
          </div>
          <div className="percentage">{percentage}%</div>
          <p className="result-message">{message}</p>
          <div className="xp-earned">
            +{finalScore * 10 + (percentage === 100 ? 25 : 0)} XP earned!
          </div>
          <div className="quiz-complete-actions">
            <button className="btn btn-primary" onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setQuizComplete(false);
              setStreak(0);
              const unitQuestions = questions.filter(q => q.unit === unitId);
              const shuffled = [...unitQuestions].sort(() => Math.random() - 0.5);
              setQuizQuestions(shuffled.slice(0, Math.min(10, shuffled.length)));
            }}>
              Try Again
            </button>
            <button className="btn btn-secondary" onClick={onBack}>
              Back to Units
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="unit-badge" style={{ backgroundColor: unit?.color }}>
          {unit?.emoji} Unit {unitId}
        </div>
        <div className="quiz-progress">
          {currentQuestion + 1} / {quizQuestions.length}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            backgroundColor: unit?.color
          }}
        />
      </div>

      {showStreak && (
        <div className="streak-popup">
          🔥 {streak} in a row!
        </div>
      )}

      <div className="question-card">
        <div className="question-number">Question {currentQuestion + 1}</div>
        <h3 className="question-text">{question.question}</h3>

        <div className="options">
          {question.options.map((option, index) => {
            let optionClass = 'option';
            if (showResult) {
              if (index === question.correct) {
                optionClass += ' correct';
              } else if (index === selectedAnswer) {
                optionClass += ' incorrect';
              }
            } else if (index === selectedAnswer) {
              optionClass += ' selected';
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === question.correct && <span className="check">✓</span>}
                {showResult && index === selectedAnswer && index !== question.correct && <span className="x">✗</span>}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`explanation ${selectedAnswer === question.correct ? 'correct' : 'incorrect'}`}>
            <div className="explanation-header">
              {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <p>{question.explanation}</p>
            <button className="btn btn-primary next-btn" onClick={nextQuestion}>
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-score">
        Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
      </div>
    </div>
  );
}

export default Quiz;
