import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  async function handleCorrectAnswerChange(id, correctIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      if (!response.ok) {
        throw new Error("Failed to update correct answer");
      }
      setQuestions(prevQuestions => {
        return prevQuestions.map(question => {
          if (question.id === id) {
            return { ...question, correctIndex };
          }
          return question;
        });
      });
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
