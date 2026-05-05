'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { CreateQuizSchema } from '../schemas/createQuizSchema';

interface Props {
  index: number;
}

export const InputQuestionFields = ({ index }: Props) => {
  const form = useFormContext<CreateQuizSchema>();

  return (
    <FormField
      control={form.control}
      name={`questions.${index}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Correct Answer</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter expected answer"
              {...field}
              value={(field.value as string) ?? ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
