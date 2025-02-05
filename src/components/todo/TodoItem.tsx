import React from "react";
import { Task } from "@/types/todo";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <Card className="flex flex-col gap-2 p-4 hover:shadow-lg transition-shadow">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="h-5 w-5"
          />
          <CardTitle
            className={cn(
              "text-lg font-medium",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </CardTitle>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              aria-label="Delete Task"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Task</TooltipContent>
        </Tooltip>
      </CardHeader>
      {task.description && (
        <CardDescription className="text-sm text-muted-foreground">
          {task.description}
        </CardDescription>
      )}
      {task.dueDate && (
        <CardFooter className="text-xs text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </CardFooter>
      )}
    </Card>
  );
};

export default TodoItem;
