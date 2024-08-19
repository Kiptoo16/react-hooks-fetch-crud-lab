import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setQuestions(questions.filter(question => question.id !== id));
    })
    .catch(error => console.error('Error deleting question:', error));
  };

  const handleUpdate = (updatedQuestion) => {
    setQuestions(questions.map(question =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
  };

  return (
    <div>
      {questions.map(question => (
        <QuestionItem
          key={question.id}
          question={question}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default QuestionList;
