import Link from "next/link";
import { buttonVariants } from "@/shared/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <h1 className="text-2xl font-semibold">Quiz Builder</h1>
      <Link href="/quizzes" className={buttonVariants({ variant: "default" })}>
        Go to quizzes
      </Link>
    </main>
  );
}
