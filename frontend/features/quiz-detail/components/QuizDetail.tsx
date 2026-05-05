import type { QuizDetail as QuizDetailType } from "@/shared/actions/quiz/types";
import { QuestionView } from "./QuestionView";

interface Props {
  quiz: QuizDetailType;
}

export const QuizDetail = ({ quiz }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{quiz.title}</h1>
        {quiz.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {quiz.description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q, i) => (
          <QuestionView key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
};
