"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Answer = {
  question: string;
  options: string[];
  answer: string;
};

export function TextToText() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [step, setStep] = useState("Page1");

  const [quizStep, setQuizStep] = useState(0);

  const handleQuizStep = () => {
    setQuizStep((prev) => prev + 1);
  };

  const [generatedText, setGenenratedText] = useState<Answer[]>([]);
  const GenerateContent = async () => {
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text2),
    });
    const data = await response.json();
    console.log({ data });
    if (data.data.length > 0) {
      setStep("Page2");
    }
    setText3(data.data);
  };
  const Continue = () => {
    setStep("Page2");
  };

  const generateContent = async () => {
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text3),
    });

    const rawData = await response.json();
    console.log({ rawData });

    const cleanedText = extractJsonArray(rawData.data || rawData);
    try {
      const parsedArray = JSON.parse(cleanedText);

      setGenenratedText(parsedArray);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
    if (rawData) {
      setStep("Page3");
    }
  };

  const extractJsonArray = (text: string) => {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      return match[1].trim();
    }
    return text.trim();
  };
  if (step === "Page1") {
    return (
      <div className="flex justify-center items-center pt-12">
        <div className="p-7 gap-5 rounded-lg border-[#E4E4E7] bg-white">
          <div className="flex gap-2">
            <img src="star.svg" />
            <h1 className="font-semibold text-2xl">Article Quiz Generatore</h1>
          </div>
          <h5 className="text-[#71717A] font-normal text-base">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </h5>
          <div className="flex gap-2 pt-5">
            <img src="article.svg" />
            <h1 className="text-sm text-muted-foreground font-semibold">
              Article Title
            </h1>
          </div>
          <Input
            placeholder="Enter a title for your article..."
            className="border-3 border-gray-500 rounded-md w-200 h-10"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex gap-2 pt-5">
            <img src="article.svg" />
            <h1 className="text-sm text-muted-foreground font-semibold">
              Article Content
            </h1>
          </div>
          <Textarea
            placeholder="Enter a title for your article..."
            className="border-3 border-gray-500 rounded-md w-200 h-10 "
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
          <Dialog>
            <DialogTrigger>See more</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{text2}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div className="flex justify-end pt-10">
            <Button
              //   size="sm"
              //   variant="outline"
              //   disabled
              type="submit"
              className="h-10 p-4 justify-center flex rounded-md bg-black text-white items-center text-base font-medium "
              onClick={GenerateContent}
            >
              {/* <Spinner /> */}
              Generate summary
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (step === "Page2") {
    return (
      <div className="flex justify-center items-center pt-12">
        <div className="p-7 gap-5 rounded-lg border-[#E4E4E7] bg-white">
          <div className="flex gap-2">
            <img src="star.svg" />
            <h1 className="font-semibold text-2xl">Article Quiz Generatore</h1>
          </div>
          <h5 className="text-[#71717A] font-normal text-base"></h5>
          <div className="flex gap-2 pt-5">
            <img src="book-open.svg" />
            <h1 className="text-sm text-muted-foreground font-semibold">
              Summarized content
            </h1>
          </div>
          <div className="font-semibold text-2xl">{text}</div>

          <div className="w-200">{text3}</div>

          <div className="flex items-center pt-10">
            <button
              onClick={() => setStep("Page1")}
              className="h-10 p-4 justify-center flex rounded-md rounded-gray-400 border-input border-2 bg-white text-black items-center text-base font-medium hover:bg-gray-200"
            >
              See content
            </button>
            <div className="flex-1"></div>
            <button
              type="submit"
              className="h-10 p-4 justify-center flex rounded-md bg-black text-white items-center text-base font-medium hover:bg-gray-400"
            >
              Take a quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (step === "Page3") {
    return (
      <div className="gap-4 flex">
        {generatedText.map((data, index) => {
          if (index === quizStep) {
            return (
              <div>
                <div>{data.question}</div>
                <div className="flex justify-center pt-10 ">
                  {data.options.map((dat) => (
                    <Button>{dat}</Button>
                  ))}
                </div>
              </div>
            );
          }
          return <></>;
        })}
      </div>
    );
  }
}
