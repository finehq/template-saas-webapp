import React from "react";
import { Todo } from "@/lib/fine";
import TodoItem from "@/components/todo/TodoItem";
import { Skeleton } from "@/components/ui/skeleton";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter?: string;
}

const TodoList = ({ todos, isLoading, onToggle, onDelete, filter }: TodoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 h-[calc(100vh-200px)] max-h-96 overflow-y-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center p-4 border rounded-lg animate-pulse">
            <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-2">No tasks found</p>
        <p className="text-sm text-muted-foreground">
          {filter === "all" 
            ? "Add a new task to get started" 
            : filter === "active" 
              ? "No active tasks found" 
              : "No completed tasks found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 h-[calc(100vh-200px)] max-h-96 overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
