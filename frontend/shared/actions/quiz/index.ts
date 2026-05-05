"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateQuizSchema } from "@/features/quiz-creation/schemas/createQuizSchema";
import type {
  ActionResult,
  QuizDetail,
  QuizListItem,
} from "./types";

const GENERAL_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const createQuizAction = async (
  data: CreateQuizSchema,
): Promise<ActionResult<void>> => {
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

  try {
    const res = await fetch(`${process.env.API_URL}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { success: false, message: GENERAL_ERROR_MESSAGE };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: GENERAL_ERROR_MESSAGE };
  }

  revalidatePath("/quizzes");
  redirect("/quizzes");
};

export const getQuizzesAction = async (): Promise<
  ActionResult<QuizListItem[]>
> => {
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, message: GENERAL_ERROR_MESSAGE };
    }

    const data = (await res.json()) as QuizListItem[];
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, message: GENERAL_ERROR_MESSAGE };
  }
};

export const getQuizByIdAction = async (
  id: number,
): Promise<ActionResult<QuizDetail>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, message: GENERAL_ERROR_MESSAGE };
    }

    const data = (await res.json()) as QuizDetail;
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, message: GENERAL_ERROR_MESSAGE };
  }
};

export const deleteQuizAction = async (
  id: number,
): Promise<ActionResult<void>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { success: false, message: GENERAL_ERROR_MESSAGE };
    }

    revalidatePath("/quizzes");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: GENERAL_ERROR_MESSAGE };
  }
};
