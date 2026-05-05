'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  createQuizSchema,
  CreateQuizSchema,
} from '../schemas/createQuizSchema';
import { QuestionCard } from './QuestionCard';
import { createQuizAction } from '@/shared/actions/quiz';

const DEFAULT_QUESTION: CreateQuizSchema['questions'][number] = {
  type: 'boolean',
  text: '',
  correctAnswer: 'true',
};

export const CreateQuizForm = () => {
  const form = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [DEFAULT_QUESTION],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = async (data: CreateQuizSchema) => {
    await createQuizAction(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quiz Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quiz title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <QuestionCard
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append(DEFAULT_QUESTION)}
          className="w-full gap-2"
        >
          <Plus />
          Add Question
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Create Quiz</Button>
        </div>
      </form>
    </Form>
  );
};
