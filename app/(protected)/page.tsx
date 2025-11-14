"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type UserAnswer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

export default function Home() {
  const [page, setPage] = useState<"start" | "summary" | "quiz" | "result">(
    "start"
  );
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleSummary, setArticleSummary] = useState("");
  const [takeID, setTakeID] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articlecontent: articleContent, articleTitle }),
      });

      const data = await response.json();
      console.log({ data });
      if (data.error) throw new Error(data.error);
      setArticleSummary(data.data.summary);
      setTakeID(data.data.id);

      setPage("summary");
    } catch (err: any) {
      console.error("Error generating summary:", err);
      alert("Summary үүсгэхэд алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!articleSummary || !takeID) {
      alert("Summary болон ID дутуу байна!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/generate/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSummary, takeID }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setQuestions(data.data);
      setStep(0);
      setUserAnswers([]);
      setCorrectAnswers(0);
      setPage("quiz");
    } catch (err: any) {
      console.error("Error generating quiz:", err);
      alert("Quiz үүсгэхэд алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const current = questions[step];
    const correctIndex = parseInt(current.answer);
    const isCorrect = selectedIndex === correctIndex;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected: current.options[selectedIndex],
        correct: current.options[correctIndex],
        isCorrect,
      },
    ]);

    if (isCorrect) setCorrectAnswers((prev) => prev + 1);

    if (step + 1 >= questions.length) {
      setPage("result");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="bg-accent w-screen h-screen p-10 overflow-y-auto">
      {page === "start" && (
        <div className="w-[856px] mx-auto bg-white border rounded-md p-6 mt-20">
          <div className="flex gap-2 mb-2 items-center">
            <img src="/Vector.svg" alt="logo" />
            <h1 className="font-bold text-3xl">Article Quiz Generator</h1>
          </div>

          <p className="text-gray-600 mb-6">
            Paste your article below to generate a summary and quiz questions.
          </p>

          <label className="text-gray-700 flex gap-2 mb-2">
            <img src="/Shape.svg" alt="" />
            Article Title
          </label>
          <Input
            placeholder="Enter a title..."
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />

          <label className="text-gray-700 flex gap-2 mt-5 mb-2">
            <img src="/Shape.svg" alt="" />
            Article Content
          </label>
          <Textarea
            placeholder="Paste your article content here..."
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          />

          <div className="flex justify-end mt-5">
            <Button
              onClick={handleGenerateSummary}
              disabled={!articleContent || loading}
            >
              {loading ? "Generating..." : "Generate Summary"}
            </Button>
          </div>
        </div>
      )}

      {page === "summary" && (
        <div className="w-[856px] mx-auto bg-white border rounded-md p-6 mt-20">
          <div
            className="w-12 h-10 border flex items-center justify-center mb-5 cursor-pointer"
            onClick={() => setPage("start")}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>

          <div className="flex gap-2 mb-2 items-center">
            <img src="/Vector.svg" />
            <h1 className="font-bold text-3xl">Article Summary</h1>
          </div>

          <h2 className="font-bold mt-4 text-lg">{articleTitle}</h2>
          <p className="mt-4 text-gray-700 whitespace-pre-wrap">
            {articleSummary}
          </p>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setPage("start")}>
              Back
            </Button>
            <Button onClick={handleGenerateQuiz} disabled={loading}>
              {loading ? "Generating Quiz..." : "Take a Quiz"}
            </Button>
          </div>
        </div>
      )}

      {page === "quiz" && questions[step] && (
        <div className="w-[700px] mx-auto bg-white border rounded-md p-6 mt-20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Quick Test</h1>
            <Button variant="outline" onClick={() => setPage("start")}>
              X
            </Button>
          </div>

          <p className="text-gray-600 mt-2">
            Question {step + 1} / {questions.length}
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">
              {questions[step].question}
            </h2>

            <div className="flex flex-col gap-3">
              {questions[step].options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => handleAnswer(idx)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === "result" && (
        <div className="w-[600px] mx-auto bg-white border rounded-md p-6 mt-20">
          <div className="flex gap-2 items-center mb-4">
            <img src="/Vector.svg" />
            <h1 className="font-bold text-3xl">Quiz Completed</h1>
          </div>
          <p className="text-gray-600 mb-4">Let’s see what you did 👇</p>

          <div className="text-2xl font-bold mb-6">
            Your score: {correctAnswers} / {questions.length}
          </div>

          <div className="space-y-4">
            {userAnswers.map((ans, i) => (
              <div key={i} className="border-b pb-3">
                <div className="font-medium text-gray-700">
                  {i + 1}. {ans.question}
                </div>
                <div>Your answer: {ans.selected}</div>
                <div
                  className={ans.isCorrect ? "text-green-600" : "text-red-600"}
                >
                  Correct answer: {ans.correct}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setStep(0);
                setCorrectAnswers(0);
                setUserAnswers([]);
                setPage("quiz");
              }}
            >
              Restart Quiz
            </Button>
            <Button
              onClick={() => {
                setArticleContent("");
                setArticleTitle("");
                setArticleSummary("");
                setQuestions([]);
                setStep(0);
                setCorrectAnswers(0);
                setUserAnswers([]);
                setPage("start");
              }}
            >
              Save and Leave
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
