export type ActionResult<T = unknown> =
  | (T extends void ? { success: true } : { success: true; data: T })
  | {
      success: false;
      message: string;
    };

export type QuizListItem = {
  id: number;
  title: string;
  questionCount: number;
};

export type QuizQuestion = {
  id: number;
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options: string[] | null;
  correctAnswer: string | null;
  correctOptionIndices: number[] | null;
};

export type QuizDetail = {
  id: number;
  title: string;
  description: string | null;
  questions: QuizQuestion[];
};
