import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import type { QuizQuestion } from '@/shared/actions/quiz/types';

const TYPE_LABEL: Record<QuizQuestion['type'], string> = {
  boolean: 'Boolean (True / False)',
  input: 'Input (Short Answer)',
  checkbox: 'Checkbox (Multiple Choice)',
};

interface Props {
  question: QuizQuestion;
  index: number;
}

export const QuestionView = ({ question, index }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Question {index + 1}
        </span>
        <span className="text-xs text-muted-foreground">
          {TYPE_LABEL[question.type]}
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-base font-medium">{question.text}</p>

        {question.type === 'boolean' && (
          <p className="text-sm text-muted-foreground">
            Correct answer:{' '}
            <span className="font-medium text-foreground">
              {question.correctAnswer === 'true' ? 'True' : 'False'}
            </span>
          </p>
        )}

        {question.type === 'input' && (
          <p className="text-sm text-muted-foreground">
            Correct answer:{' '}
            <span className="font-medium text-foreground">
              {question.correctAnswer}
            </span>
          </p>
        )}

        {question.type === 'checkbox' && (
          <ul className="space-y-1">
            {question.options?.map((opt, i) => {
              const isCorrect = question.correctOptionIndices?.includes(i);
              return (
                <li
                  key={i}
                  className={
                    isCorrect
                      ? 'text-sm font-medium text-foreground'
                      : 'text-sm text-muted-foreground'
                  }
                >
                  {isCorrect ? '✓ ' : '• '}
                  {opt}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
