import React from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="overflow-y-auto max-h-screen p-4 grid gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
