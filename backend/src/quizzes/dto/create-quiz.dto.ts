export class CreateQuestionDto {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export class CreateQuizDto {
  title: string;
  description?: string;
  questions: CreateQuestionDto[];
}
