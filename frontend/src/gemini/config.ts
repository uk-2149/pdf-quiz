import { GoogleGenAI } from "@google/genai";
import type { Data } from "../types/Data";
import type { Question } from "../types/Question";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function getQuestions(data: Data): Promise<Question[]> {
  console.log(data.content);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are an AI that generates quiz questions based on the given content.

Generate exactly ${data.count} ${data.type.toUpperCase()} questions at ${data.level.toUpperCase()} difficulty level from the following content:

${data.content}

${(data.custom) ? `Additional user instruction: ${data.custom}` : ""}

Return your response as a **valid JSON array** containing exactly ${data.count} objects.

Each object must have the following keys:
- "question": string (the quiz question)
- "options": string[] (exactly 4 distinct options)
- "answer": string (must match one of the options)

Strictly return only the JSON array. Do not include explanations, comments, markdown, or any additional text. Ensure all strings are properly quoted.
  `,
  });

  const raw = response.text;

  if (!raw) {
    throw new Error("No response text received from Gemini.");
  }
  console.log(raw);
  const cleanedText = raw.replace(/```json\n?|```/g, "").trim();
  const parsedResult = JSON.parse(cleanedText);
  console.log(parsedResult);
  return parsedResult;
}

export default getQuestions;
