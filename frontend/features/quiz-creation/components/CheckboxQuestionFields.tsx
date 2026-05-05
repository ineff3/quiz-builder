'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';
import { CreateQuizSchema } from '../schemas/createQuizSchema';

interface Props {
  index: number;
}

export const CheckboxQuestionFields = ({ index }: Props) => {
  const form = useFormContext<CreateQuizSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${index}.options` as never,
  });

  const correctIndices: number[] =
    (form.watch(`questions.${index}.correctOptionIndices` as never) as number[]) ?? [];

  const toggleCorrectIndex = (optionIndex: number) => {
    const current = correctIndices;
    const updated = current.includes(optionIndex)
      ? current.filter((i) => i !== optionIndex)
      : [...current, optionIndex];
    form.setValue(
      `questions.${index}.correctOptionIndices` as never,
      updated as never,
      { shouldValidate: true },
    );
  };

  return (
    <div className="space-y-3">
      <FormField
        control={form.control}
        name={`questions.${index}.correctOptionIndices` as never}
        render={() => (
          <FormItem>
            <FormLabel>Options & Correct Answers</FormLabel>
            <div className="space-y-2">
              {fields.map((field, optionIndex) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={correctIndices.includes(optionIndex)}
                    onCheckedChange={() => toggleCorrectIndex(optionIndex)}
                  />
                  <FormField
                    control={form.control}
                    name={`questions.${index}.options.${optionIndex}.value` as never}
                    render={({ field: optionField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            {...optionField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => remove(optionIndex)}
                    disabled={fields.length <= 2}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ value: '' })}
        className="gap-1.5"
      >
        <Plus />
        Add Option
      </Button>
    </div>
  );
};
