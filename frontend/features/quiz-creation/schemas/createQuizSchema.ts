import z from 'zod';

const booleanQuestionSchema = z.object({
  type: z.literal('boolean'),
  text: z.string().min(1, 'Question text is required'),
  correctAnswer: z.enum(['true', 'false']),
});

const inputQuestionSchema = z.object({
  type: z.literal('input'),
  text: z.string().min(1, 'Question text is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const checkboxQuestionSchema = z.object({
  type: z.literal('checkbox'),
  text: z.string().min(1, 'Question text is required'),
  options: z
    .array(z.object({ value: z.string().min(1, 'Option text is required') }))
    .min(2, 'At least 2 options are required'),
  correctOptionIndices: z
    .array(z.number())
    .min(1, 'Select at least one correct answer'),
});

export const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type QuestionSchema = z.infer<typeof questionSchema>;
export type BooleanQuestionSchema = z.infer<typeof booleanQuestionSchema>;
export type InputQuestionSchema = z.infer<typeof inputQuestionSchema>;
export type CheckboxQuestionSchema = z.infer<typeof checkboxQuestionSchema>;
export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
