'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { deleteQuizAction } from '@/shared/actions/quiz';
import type { QuizListItem } from '@/shared/actions/quiz/types';

interface Props {
  quiz: QuizListItem;
}

export const QuizListItemCard = ({ quiz }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await deleteQuizAction(quiz.id);
    });
  };

  return (
    <Link href={`/quizzes/${quiz.id}`} className="block">
      <Card className="transition-colors hover:bg-accent">
        <CardContent className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-medium">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground">
              {quiz.questionCount}{' '}
              {quiz.questionCount === 1 ? 'question' : 'questions'}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete quiz"
          >
            <Trash2 />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
