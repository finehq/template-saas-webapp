import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      {/* Checkbox for toggling completion */}
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="h-5 w-5"
        />
        <span
          className={`text-sm ${
            todo.completed ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {todo.text}
        </span>
      </div>

      {/* Delete button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="h-8"
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;
