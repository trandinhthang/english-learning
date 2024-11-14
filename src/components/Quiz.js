import React, { useState, useEffect } from 'react';
import { shuffle } from '../utils';
import QuestionABCD from './QuestionABCD';
import QuestionWritten from './QuestionWritten';
import { Button, Dropdown, Option } from '@fluentui/react-components';

const Quiz = () => {
  const [topics, setTopics] = useState(
    () => JSON.parse(localStorage.getItem('topics')) || []
  );
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizType, setQuizType] = useState('multipleChoice'); // 'multipleChoice' or 'written'
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0); // Track score

  const handleStartQuiz = (selectedTopic) => {
    const selectedWords =
      topics.find((topic) => topic.name === selectedTopic)?.words || [];
    setQuizQuestions(shuffle(selectedWords));
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) setScore(score + 1); // Tăng điểm nếu đúng

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true); // Kết thúc khi hết câu hỏi
    }
  };

  return (
    <div>
      <h2>Topic</h2>

      {!isFinished && (
        <>
          <div>
            {topics.map((topic, index) => (
              <Button
                style={{ marginRight: 10, marginTop: 10 }}
                shape="circular"
                key={index}
                onClick={() => handleStartQuiz(topic.name)}
              >
                {topic.name}
              </Button>
            ))}
          </div>
          <div></div>
        </>
      )}

      {/* Quiz Questions */}
      {quizQuestions.length > 0 && !isFinished && (
        <>
          <h2>Start Quiz Type</h2>
          <div>
            <Button
              style={{ marginRight: 6, marginTop: 6 }}
              onClick={() => setQuizType('multipleChoice')}
            >
              Multiple Choice
            </Button>
            <Button
              style={{ marginRight: 6, marginTop: 6 }}
              onClick={() => setQuizType('written')}
            >
              Written
            </Button>
          </div>

          {quizType === 'multipleChoice' ? (
            <QuestionABCD
              question={quizQuestions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              allWords={quizQuestions}
            />
          ) : (
            <QuestionWritten
              question={quizQuestions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          )}
        </>
      )}

      {/* Final Message */}
      {isFinished && (
        <div>
          <h3>Quiz Finished!</h3>
          <p>
            Your score is {score} out of {quizQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
