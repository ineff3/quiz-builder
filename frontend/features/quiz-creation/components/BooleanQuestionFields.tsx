'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { CreateQuizSchema } from '../schemas/createQuizSchema';

interface Props {
  index: number;
}

export const BooleanQuestionFields = ({ index }: Props) => {
  const form = useFormContext<CreateQuizSchema>();

  return (
    <FormField
      control={form.control}
      name={`questions.${index}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Correct Answer</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value as string}
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="true" id={`q${index}-true`} />
                <FormLabel htmlFor={`q${index}-true`} className="font-normal cursor-pointer">
                  True
                </FormLabel>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="false" id={`q${index}-false`} />
                <FormLabel htmlFor={`q${index}-false`} className="font-normal cursor-pointer">
                  False
                </FormLabel>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
