import React, { useState } from "react";
import axios from "axios";
import type { Data } from "../types/Data";

function Upload() {
  const[text, setText] = useState("");
    const[formData, setFormData] = useState<Data>({
      content: "",
      count: 0,
      level: "",
      type: ""
    });

    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://localhost:5000/api/upload", formData);
        setText(res.data.text);
    }

  return (
    <div>
        <h1>Upload</h1>
        <input type="file" onChange={handleUpload} />
        <form action="">
          <label htmlFor="count">No. of questions:</label>
          <input type="number" name="count" id="count" value={formData.count} onChange={(e) => (setFormData({...formData, count: Number(e.target.value)}))}/>

          <label htmlFor="level">Level:</label>
          <select name="level" id="level" value={formData.level} onChange={(e) => (setFormData({...formData, level: e.target.value}))}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label htmlFor="type">Type:</label>
          <select name="type" id="type" value={formData.type} onChange={(e) => (setFormData({...formData, type: e.target.value}))}>
            <option value="conceptual">Conceptual</option>
            <option value="factual">Factual</option>
          </select>
        </form>
        <p>{text}</p>
    </div>
  )
}

export default Upload;