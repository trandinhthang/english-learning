import React, { useState, useEffect } from 'react';
import { shuffle } from '../utils';
import { Button } from '@fluentui/react-components';
import { handlePlayAudio } from '../utils';

const QuestionABCD = ({ question, onNext, allWords }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const wrongAnswers = allWords
      .filter((word) => word.vn !== question.vn)
      .map((word) => word.vn);
    const randomWrongAnswers = shuffle(wrongAnswers).slice(0, 3);
    const options = shuffle([question.vn, ...randomWrongAnswers]);
    setShuffledOptions(options);
  }, [question, allWords]);

  const handleAnswer = (answer) => {
    handlePlayAudio(question.audio);
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.vn);
  };

  const handleNext = () => {
    onNext(isCorrect); // Gọi hàm onNext với kết quả đúng/sai
    setSelectedAnswer('');
    setIsCorrect(null);
  };

  return (
    <div>
      <h3>Question: {question.en}</h3>
      {shuffledOptions.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleAnswer(option)}
          disabled={selectedAnswer}
        >
          {String.fromCharCode(65 + index)} - {option}
        </Button>
      ))}
      {isCorrect !== null && (
        <div>
          {isCorrect ? (
            <p>Correct!</p>
          ) : (
            <div>
              <p>Wrong! The correct answer is: {question.vn}</p>
            </div>
          )}
          <Button onClick={handleNext}>Next</Button> {/* Nút Next */}
        </div>
      )}
    </div>
  );
};

export default QuestionABCD;
