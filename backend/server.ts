import express from "express";
import cors from "cors";
import uploadFile from "./routes/uploadFile";

const app = express();

app.use(cors({
  origin: "https://quizgen-xi.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadFile);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
