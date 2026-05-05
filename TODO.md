# TODO

## Features
- Add a spaced-repetition mode for flashcards: track per-card ease and surface cards that were missed or marked "hard" first (extend `questionHistory` in `useProgress.js`).
- Add a mixed/cumulative quiz mode that pulls questions across all 7 units, weighted by the unit accuracies returned by `getWeakestUnits`.
- Add a timed practice exam mode (e.g. 55 questions in 60 minutes, AP-style scoring) using the existing `questions.js` pool.
- Save written-prompt responses to localStorage keyed by prompt id so students can revisit and revise their FRQ drafts.

## Polish
- Replace the `setTimeout(() => setNewAchievement(null), 4000)` pattern in `useProgress.js` with an effect-driven timer so achievement popups don't leak when the component unmounts.
- Show the actual unit color and emoji on the dashboard's "weakest units" section (currently only returns ids/accuracy).

## Tech debt
- Fix the off-by-one in `Quiz.jsx` `nextQuestion`: `score + (selectedAnswer === quizQuestions[currentQuestion]?.correct ? 1 : 0)` double-counts because `score` was already incremented in `handleAnswer`. Pass `score` directly to `onComplete`.
- Extract the duplicated "shuffle and slice 10" logic in `Quiz.jsx` (used in both the initial `useEffect` and Try Again handler) into a single helper.
- Add a settings/profile screen exposing `resetProgress` (already exported from `useProgress` but not wired into any view).
- Migrate `data/*.js` to JSON (or a typed schema) so question/unit data can be validated and edited without touching JS module syntax.
