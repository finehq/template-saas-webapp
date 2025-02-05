import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/useTodos";

type TodoItemProps = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const { toggleTodo, removeTodo } = useTodos();

  const handleToggle = () => {
    toggleTodo(id);
  };

  const handleDelete = () => {
    removeTodo(id);
  };

  return (
    <Card className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={completed}
          onCheckedChange={handleToggle}
          className="h-5 w-5"
          aria-label={`Mark ${text} as ${completed ? "incomplete" : "complete"}`}
        />
        <span
          className={`text-base ${
            completed ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {text}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        aria-label={`Delete ${text}`}
      >
        Delete
      </Button>
    </Card>
  );
};

export default TodoItem;
