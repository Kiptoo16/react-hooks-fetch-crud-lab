import React from 'react';

function QuestionItem({ question, onDelete, onUpdate }) {
  const handleDelete = () => {
    onDelete(question.id);
  };

  const handleCorrectIndexChange = (event) => {
    const updatedQuestion = { ...question, correctIndex: Number(event.target.value) };

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex })
    })
    .then(response => response.json())
    .then(updatedQuestion => onUpdate(updatedQuestion))
    .catch(error => console.error('Error updating question:', error));
  };

  return (
    <div>
      <h3>{question.prompt}</h3>
      {question.answers.map((answer, index) => (
        <p key={index}>{answer}</p>
      ))}
      <select
        value={question.correctIndex}
        onChange={handleCorrectIndexChange}
      >
        {question.answers.map((_, index) => (
          <option key={index} value={index}>
            Answer {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default QuestionItem;
