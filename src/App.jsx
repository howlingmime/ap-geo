import { useState } from 'react';
import Dashboard from './components/Dashboard';
import UnitMenu from './components/UnitMenu';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import StudyGuide from './components/StudyGuide';
import WrittenPrompt from './components/WrittenPrompt';
import AchievementPopup from './components/AchievementPopup';
import { useProgress } from './hooks/useProgress';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState(null);

  const {
    progress,
    levelInfo,
    newAchievement,
    recordQuizResult,
    recordFlashcardStudy,
    getOverallAccuracy,
    getUnitAccuracy,
    getWeakestUnits
  } = useProgress();

  const handleSelectUnit = (unitId) => {
    setSelectedUnit(unitId);
    setView('unitMenu');
  };

  const handleStartQuiz = (unitId) => {
    setSelectedUnit(unitId);
    setView('quiz');
  };

  const handleStartFlashcards = (unitId) => {
    setSelectedUnit(unitId);
    setView('flashcards');
  };

  const handleStartGuide = (unitId) => {
    setSelectedUnit(unitId);
    setView('guide');
  };

  const handleStartWritten = (unitId) => {
    setSelectedUnit(unitId);
    setView('written');
  };

  const handleQuizComplete = (unitId, correct, total) => {
    recordQuizResult(unitId, correct, total);
  };

  const handleFlashcardStudy = (unitId, count) => {
    recordFlashcardStudy(unitId, count);
  };

  const handleBack = () => {
    if (view === 'quiz' || view === 'flashcards' || view === 'guide' || view === 'written') {
      setView('unitMenu');
    } else {
      setView('dashboard');
      setSelectedUnit(null);
    }
  };

  return (
    <div className="app">
      <AchievementPopup achievement={newAchievement} />

      {view === 'dashboard' && (
        <Dashboard
          progress={progress}
          levelInfo={levelInfo}
          onSelectUnit={handleSelectUnit}
          getOverallAccuracy={getOverallAccuracy}
          getUnitAccuracy={getUnitAccuracy}
          getWeakestUnits={getWeakestUnits}
        />
      )}

      {view === 'unitMenu' && (
        <UnitMenu
          unitId={selectedUnit}
          onBack={handleBack}
          onStartQuiz={handleStartQuiz}
          onStartFlashcards={handleStartFlashcards}
          onStartGuide={handleStartGuide}
          onStartWritten={handleStartWritten}
          unitAccuracy={getUnitAccuracy(selectedUnit)}
        />
      )}

      {view === 'quiz' && (
        <Quiz
          unitId={selectedUnit}
          onComplete={handleQuizComplete}
          onBack={handleBack}
        />
      )}

      {view === 'flashcards' && (
        <Flashcards
          unitId={selectedUnit}
          onBack={handleBack}
          onStudy={handleFlashcardStudy}
        />
      )}

      {view === 'guide' && (
        <StudyGuide
          unitId={selectedUnit}
          onBack={handleBack}
          onStartQuiz={handleStartQuiz}
          onStartFlashcards={handleStartFlashcards}
        />
      )}

      {view === 'written' && (
        <WrittenPrompt
          unitId={selectedUnit}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
