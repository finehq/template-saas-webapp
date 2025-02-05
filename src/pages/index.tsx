// Update this page (the content is just a fallback if you fail to update the page)

import React, { useEffect } from "react";
import AddTask from "@/components/todo/AddTask";
import TaskList from "@/components/todo/TaskList";

const Index = () => {
  useEffect(() => {
    document.title = "To-Do List - Fine";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background text-foreground p-6">
      <header className="w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </header>
      <main className="w-full max-w-4xl space-y-6">
        <AddTask />
        <TaskList />
      </main>
    </div>
  );
};

export default Index;