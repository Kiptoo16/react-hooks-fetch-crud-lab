import React, { useState } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';
//import App from '../App'; 

function App() {
  const [questions, setQuestions] = useState([]);

  const handleQuestionAdded = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionDeleted = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const handleQuestionUpdated = (updatedQuestion) => {
    setQuestions(questions.map(question =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
  };

  return (
    <div>
      <QuestionForm onQuestionAdded={handleQuestionAdded} />
      <QuestionList
        questions={questions}
        onQuestionDeleted={handleQuestionDeleted}
        onQuestionUpdated={handleQuestionUpdated}
      />
    </div>
  );
}

export default App;
