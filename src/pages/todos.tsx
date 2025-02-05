import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ToDoList from "@/components/todo/ToDoList";

const TodosPage = () => {
  useEffect(() => {
    document.title = "To-Do List - Fine";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
      <header className="w-full bg-primary text-primary-foreground py-4 shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">To-Do List</h1>
        </div>
      </header>
      <main className="flex-1 w-full container mx-auto px-4 py-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <ToDoList />
        </Card>
      </main>
    </div>
  );
};

export default TodosPage;
