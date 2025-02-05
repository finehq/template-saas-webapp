import React, { useEffect } from "react";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import { useTodosz } from "@/hooks/use-todos";

const Index = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  useEffect(() => {
    document.title = "To-do List - Fine";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-do List</h1>
        <TodoInput onAddTodo={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
      </div>
    </div>
  );
};

export default Index;
