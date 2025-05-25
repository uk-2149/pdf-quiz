import { GoogleGenAI } from "@google/genai";
import type { Data } from "../types/Data";
import type { Question } from "../types/Question";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY});

async function getQuestions(data: Data): Promise<Question[]> {

console.log(data.content);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Content:
${data.content}

You are an AI that generates quiz questions based on given content.
Generate ${data.count} ${data.type.toUpperCase()} questions of ${data.level.toUpperCase()} difficulty from the above content.

Return a JSON array where each object has:
- question: string
- options: string[]
- answer: string (must match one of the options)



Strictly return only the JSON array.
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
