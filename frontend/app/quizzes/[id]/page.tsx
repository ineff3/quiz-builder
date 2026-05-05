import { notFound } from "next/navigation";
import { getQuizByIdAction } from "@/shared/actions/quiz";
import { QuizDetail } from "@/features/quiz-detail/components/QuizDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailPage({ params }: Props) {
  const { id } = await params;
  const quizId = Number(id);
  if (Number.isNaN(quizId)) notFound();

  const result = await getQuizByIdAction(quizId);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      {result.success ? (
        <QuizDetail quiz={result.data} />
      ) : (
        <p className="text-sm text-destructive">{result.message}</p>
      )}
    </main>
  );
}
