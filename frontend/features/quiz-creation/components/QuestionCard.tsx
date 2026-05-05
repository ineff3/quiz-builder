"use client";

import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { CreateQuizSchema, QuestionSchema } from "../schemas/createQuizSchema";
import { QUESTION_TYPES, DEFAULT_BY_TYPE } from "../constants/questionTypes";
import { BooleanQuestionFields } from "./BooleanQuestionFields";
import { InputQuestionFields } from "./InputQuestionFields";
import { CheckboxQuestionFields } from "./CheckboxQuestionFields";

type QuestionType = QuestionSchema["type"];

interface Props {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

export const QuestionCard = ({ index, onRemove, canRemove }: Props) => {
  const form = useFormContext<CreateQuizSchema>();
  const questionType = form.watch(`questions.${index}.type`);

  const handleTypeChange = (type: QuestionType) => {
    if (type === questionType) return;
    form.resetField(`questions.${index}`, {
      defaultValue: DEFAULT_BY_TYPE[type],
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Question {index + 1}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          disabled={!canRemove}
        >
          <Trash2 />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={`questions.${index}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => handleTypeChange(val as QuestionType)}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type">
                      {(value: QuestionType) =>
                        QUESTION_TYPES.find((t) => t.value === value)?.label ??
                        "Select a type"
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    {QUESTION_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`questions.${index}.text`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter your question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {questionType === "boolean" && <BooleanQuestionFields index={index} />}
        {questionType === "input" && <InputQuestionFields index={index} />}
        {questionType === "checkbox" && (
          <CheckboxQuestionFields index={index} />
        )}
      </CardContent>
    </Card>
  );
};
