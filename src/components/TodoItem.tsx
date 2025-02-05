import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border rounded-md shadow-sm bg-card text-card-foreground",
        "hover:shadow-md transition-shadow"
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggleComplete(id)}
          className="shrink-0"
        />
        <Label
          htmlFor={`todo-${id}`}
          className={cn(
            "text-sm font-medium",
            completed ? "line-through text-muted-foreground" : ""
          )}
        >
          {text}
        </Label>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(id)}
        className="shrink-0"
      >
        Delete
      </Button>
    </div>
  );
};
