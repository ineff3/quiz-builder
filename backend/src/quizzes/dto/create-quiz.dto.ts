export type QuestionType = 'boolean' | 'input' | 'checkbox';

export class CreateQuestionDto {
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
  correctOptionIndices?: number[];
}

export class CreateQuizDto {
  title: string;
  description?: string;
  questions: CreateQuestionDto[];
}
