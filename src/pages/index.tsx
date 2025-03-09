import { TodoForm } from "@/components/TodoForm";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";
import { ModeToggle } from "@/components/ModeToggle";

const Index = () => {
  return (
    <main className="w-full min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <ModeToggle />
        </div>
        
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </div>
    </main>
  );
};

export default Index;