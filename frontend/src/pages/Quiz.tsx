import { useState } from "react";
import type { Question } from "../types/Question";
import jsPDF from "jspdf";

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

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Quiz with Answers", 10, 10);
  
    let y = 20;
  
    const wrapText = (text: string, maxWidth = 180) => {
      return doc.splitTextToSize(text, maxWidth);
    };
  
    // Print questions
    questions.forEach((q, index) => {
      const questionLines = wrapText(`${index + 1}. ${q.question}`);
      doc.text(questionLines, 10, y);
      y += questionLines.length * 7;
  
      q.options.forEach((opt) => {
        const optionLines = wrapText(`- ${opt}`);
        doc.text(optionLines, 14, y);
        y += optionLines.length * 6;

        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
  
      y += 6;
  
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
  
    y += 10;
  
    if (y > 260) {
      doc.addPage();
      y = 10;
    }
  
    // Print 'Answers'
    doc.setFontSize(12);
    doc.text("Answers:", 10, y);
    y += 8;
  
    // Print all answers
    questions.forEach((q, index) => {
      const answerLines = wrapText(`${index + 1}. ${q.answer}`);
      doc.text(answerLines, 10, y);
      y += answerLines.length * 6;
  
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
  
    doc.save("quiz-with-answers.pdf");
  };
  
    
  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow space-y-4">
      <button
    className="bg-green-600 text-white px-4 py-2 rounded"
    onClick={handleDownload}
  >
    Download Quiz PDF
  </button>
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
