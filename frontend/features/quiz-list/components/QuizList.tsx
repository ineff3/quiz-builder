import type { QuizListItem } from "@/shared/actions/quiz/types";
import { QuizListItemCard } from "./QuizListItemCard";

interface Props {
  quizzes: QuizListItem[];
}

export const QuizList = ({ quizzes }: Props) => {
  if (quizzes.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No quizzes yet. Create your first one.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {quizzes.map((q) => (
        <QuizListItemCard key={q.id} quiz={q} />
      ))}
    </div>
  );
};
