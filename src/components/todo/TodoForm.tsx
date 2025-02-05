import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PriorityLevel, Category } from "@/types/todo";
import { format } from "date-fns";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["Work", "Personal", "Shopping", "Health", "Finance", "Other"]),
  dueDate: z.date().nullable(),
  priority: z.nativeEnum(PriorityLevel),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TodoFormProps {
  onSubmit: (data: TaskFormValues) => void;
  defaultValues?: Partial<TaskFormValues>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Work",
      dueDate: null,
      priority: PriorityLevel.Medium,
      ...defaultValues,
    },
  });

  const dueDate = watch("dueDate");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          {...register("title")}
          className={cn(errors.title && "border-destructive")}
        />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Task description"
          {...register("description")}
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="category" className={cn(errors.category && "border-destructive")}>
                {field.value}
              </SelectTrigger>
              <SelectContent>
                {Object.values(Category).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              {dueDate ? format(dueDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => setValue("dueDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.dueDate && <p className="text-destructive text-sm">{errors.dueDate.message}</p>}
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex space-x-4"
            >
              {Object.values(PriorityLevel).map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <RadioGroupItem value={priority} id={priority} />
                  <Label htmlFor={priority}>{priority}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.priority && <p className="text-destructive text-sm">{errors.priority.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Save Task
      </Button>
    </form>
  );
};

export default TodoForm;
