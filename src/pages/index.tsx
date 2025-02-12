// Update this page (the content is just a fallback if you fail to update the page). Always include w-full and min-h-screen classes in the main element.

import { AppSidebar } from "@/components/layout/Sidebar";
import ToDoList from "@/components/ToDoList";

const Index = () => {
  return (
    <main className="w-full min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>
        </header>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-6">
          <ToDoList />
        </div>
      </div>
    </main>
  );
};

export default Index;