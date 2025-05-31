# QuizGen - Convert Documents to Customizable Quizzes

**QuizGen** is a web-based tool that allows users to upload typed documents or PDF files and convert them into customizable quizzes. It supports setting the difficulty level, choosing question types, and adding custom prompts to generate tailored quizzes. The quizzes can then be downloaded with answers at the end.

---

## 🔗 Demo

Try the live demo here: [QuizGen](https://quizgen-xi.vercel.app)

---

## ✨ Features

- **Upload Documents**  
  Upload typed documents (`.docx`) or PDFs for quiz generation.

- **Customizable Quiz**
  - Set the **difficulty level** (Easy, Medium, Hard).
  - Choose the **question type** (Conceptual or Factual).
  - Add your own **custom prompt** for more tailored quiz questions.

- **Downloadable Quiz**  
  Get the generated quiz in a downloadable format, complete with answers at the end.

---

## 🛠️ Tech Stack

### Frontend

- **React** – For building the user interface.
- **Tailwind CSS** – For styling the application with utility-first CSS.

### Backend

- **Express.js** – For the server-side logic.
- **Node.js** – For running the backend server.

### Libraries and APIs

- **pdf-parse** – For extracting text from PDF files.
- **Mammoth** – For extracting text from `.docx` files.
- **Gemini API** – For creating questions and quizzes based on the extracted text.

---

## 📦 Installation

### Prerequisites
- Node.js and npm installed
- A Gemini API key

### Steps

1. Clone the repository:

```bash
git clone https://github.com/uk-2149/pdf-quiz.git
cd pdf-quiz
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up Gemini API Key:
- Create a `.env` file in the frontend folder and add your Gemini API key
```bash
GEMINI_API_KEY=your_api_key
```

4. Start the development servers:
```bash
# Backend
cd backend
npm start

# Frontend (in another terminal)
cd ../frontend
npm run dev
```

