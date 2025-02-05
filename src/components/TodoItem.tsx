import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={onToggle}
          className="h-5 w-5"
        />
        <span
          className={cn(
            "text-sm font-medium",
            completed ? "line-through text-muted-foreground" : "text-foreground"
          )}
        >
          {text}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        className="ml-4"
      >
        Delete
      </Button>
    </Card>
  );
};

export default TodoItem;
