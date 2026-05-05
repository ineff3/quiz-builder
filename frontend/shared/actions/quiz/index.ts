"use server";

import { CreateQuizSchema } from "@/features/quiz-creation/schemas/createQuizSchema";

export type ActionResult<T = unknown> =
  | (T extends void ? { success: true } : { success: true; data: T })
  | {
      success: false;
      message: string;
    };

const GENERAL_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const createQuizAction = async (
  data: CreateQuizSchema,
): Promise<ActionResult<void>> => {
  try {
    const payload = {
      title: data.title,
      questions: data.questions.map((q) => {
        if (q.type === "checkbox") {
          return {
            type: q.type,
            text: q.text,
            options: q.options.map((o) => o.value),
            correctOptionIndices: q.correctOptionIndices,
          };
        }
        return {
          type: q.type,
          text: q.text,
          correctAnswer: q.correctAnswer,
        };
      }),
    };

    const res = await fetch(`${process.env.API_URL}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { success: false, message: GENERAL_ERROR_MESSAGE };
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: GENERAL_ERROR_MESSAGE };
  }
};
