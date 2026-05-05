import { QuestionSchema } from '../schemas/createQuizSchema';

type QuestionType = QuestionSchema['type'];

export const QUESTION_TYPES = [
  { value: 'boolean', label: 'Boolean (True / False)' },
  { value: 'input', label: 'Input (Short Answer)' },
  { value: 'checkbox', label: 'Checkbox (Multiple Choice)' },
] as const;

export const DEFAULT_BY_TYPE: Record<QuestionType, QuestionSchema> = {
  boolean: { type: 'boolean', text: '', correctAnswer: 'true' },
  input: { type: 'input', text: '', correctAnswer: '' },
  checkbox: { type: 'checkbox', text: '', options: [{ value: '' }, { value: '' }], correctOptionIndices: [] },
};
