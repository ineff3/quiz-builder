import Link from "next/link";
import { getQuizzesAction } from "@/shared/actions/quiz";
import { QuizList } from "@/features/quiz-list/components/QuizList";
import { buttonVariants } from "@/shared/components/ui/button";

export default async function QuizzesPage() {
  const result = await getQuizzesAction();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        <Link href="/create" className={buttonVariants({ variant: "default" })}>
          Create Quiz
        </Link>
      </div>
      {result.success ? (
        <QuizList quizzes={result.data} />
      ) : (
        <p className="text-sm text-destructive">{result.message}</p>
      )}
    </main>
  );
}
