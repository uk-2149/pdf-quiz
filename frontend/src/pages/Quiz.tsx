import { useState } from "react";
import type { Question } from "../types/Question";

type QuizProps = {
  questions: Question[];
};

function Quiz({ questions }: QuizProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    userAnswers.forEach((answer, idx) => {
      if (answer === questions[idx].answer) calculatedScore += 1;
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>

      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">{index + 1}. {q.question}</h2>
          <ul>
            {q.options.map((opt: string) => (
              <li key={opt}>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={userAnswers[index] === opt}
                    disabled={submitted}
                    onChange={() => handleSelect(index, opt)}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {!submitted ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={userAnswers.includes("")}
          onClick={handleSubmit}
        >
          Submit
        </button>
      ) : (
        <div className="text-lg font-semibold text-green-600">
          You scored {score} out of {questions.length}
        </div>
      )}
    </div>
  );
}

export default Quiz;
