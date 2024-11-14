import { Button, Input } from '@fluentui/react-components';
import React, { useState } from 'react';
import { handlePlayAudio } from '../utils';

const QuestionWritten = ({ question, onNext }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePlayAudio(question.audio);

    setIsCorrect(
      userAnswer?.trim().toLowerCase() === question.en?.trim().toLowerCase()
    );
  };

  const handleNext = () => {
    onNext(isCorrect); // Gọi hàm onNext với kết quả đúng/sai
    setUserAnswer('');
    setIsCorrect(null);
  };

  return (
    <div>
      <h3>Question: {question.vn}</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <Button style={{ marginLeft: 6, marginRight: 6 }} type="submit">
          Submit
        </Button>
      </form>
      {isCorrect !== null && (
        <div>
          {isCorrect ? (
            <p>Correct!</p>
          ) : (
            <div>
              <p>Wrong! The correct answer is: {question.en}</p>{' '}
              {/* Hiển thị đáp án đúng */}
            </div>
          )}
          <Button onClick={handleNext}>Next</Button> {/* Nút Next */}
        </div>
      )}
    </div>
  );
};

export default QuestionWritten;
