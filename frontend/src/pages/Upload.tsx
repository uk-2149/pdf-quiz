import React, { useState } from "react";
import axios from "axios";
import type { Data } from "../types/Data";
import type { Question } from "../types/Question";
import getQuestions from "../gemini/config";
import Quiz from "./Quiz";

function Upload() {
  const[submitted, setSubitted] = useState<Boolean>(false);
  const[text, setText] = useState("");
    const[formData, setFormData] = useState<Data>({
      content: "",
      count: 0,
      level: "easy",
      type: "conceptual"
    });
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://localhost:5000/api/upload", formData);
        setText(res.data.text);
    }

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      const updatedFormData = { ...formData, content: text };
      setFormData(updatedFormData);
      const q = await getQuestions(updatedFormData);
      setQuestions(q);
      setSubitted(true);
    }

  return (
    <>
        {(!submitted) ?
           (<><h1>Upload</h1>
        <input type="file" onChange={handleUpload} />
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="count">No. of questions:</label>
          <input type="number" name="count" id="count" value={formData.count} onChange={(e) => (setFormData({...formData, count: Number(e.target.value)}))}/>

          <label htmlFor="level">Level:</label>
          <select name="level" id="level" value={formData.level} onChange={(e) => (setFormData({...formData, level: e.target.value as "easy" | "medium" | "hard"}))}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label htmlFor="type">Type:</label>
          <select name="type" id="type" value={formData.type} onChange={(e) => (setFormData({...formData, type: e.target.value as "factual" | "conceptual"}))}>
            <option value="conceptual">Conceptual</option>
            <option value="factual">Factual</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <p>{text}</p> </>) : <Quiz questions={questions}/> }
        </>
  )
}

export default Upload;