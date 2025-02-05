import React, { useEffect } from "react";
import TodoListz from "@/components/TodoList";

const Index = () => {
  useEffect(() => {
    document.title = "To-Do List - Fine";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <TodoList />
    </div>
  );
};

export default Index;
