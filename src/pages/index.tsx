// Update this page (the content is just a fallback if you fail to update the page)

import React from "react";
import { Helmet } from "react-helmet";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 w-full p-4">
      <Helmet>
        <title>To-Do List - Fine</title>
      </Helmet>
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center">To-Do List</h1>
      </header>
      <main className="w-full max-w-2xl flex flex-col gap-4">
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
};

export default Index;