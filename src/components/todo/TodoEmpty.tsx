import React from "react";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoFilter } from "@/lib/fine";

interface TodoEmptyProps {
  filter: TodoFilter;
  onAddClick?: () => void;
}

const TodoEmpty = ({ filter, onAddClick }: TodoEmptyProps) => {
  const getMessage = () => {
    switch (filter) {
      case "active":
        return "No active tasks found";
      case "completed":
        return "No completed tasks found";
      default:
        return "Add a new task to get started";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 h-[calc(100vh-200px)] max-h-96">
      <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No tasks found</h3>
      <p className="text-sm text-muted-foreground mb-6">{getMessage()}</p>
      
      {filter === "all" && (
        <Button onClick={onAddClick} className="mt-2">
          Create your first task
        </Button>
      )}
      
      {filter === "active" && (
        <p className="text-sm text-muted-foreground">
          All your tasks are completed. Great job!
        </p>
      )}
      
      {filter === "completed" && (
        <p className="text-sm text-muted-foreground">
          Complete some tasks to see them here.
        </p>
      )}
    </div>
  );
};

export default TodoEmpty;
