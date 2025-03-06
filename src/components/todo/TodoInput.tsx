import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

interface TodoInputProps {
  onAddTodo: (text: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
}

const TodoInput = ({ onAddTodo, isLoading = false, placeholder = "Add a new task..." }: TodoInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    if (!trimmedText) {
      toast.error("Task cannot be empty");
      return;
    }
    
    try {
      await onAddTodo(trimmedText);
      setText("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="h-11 flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        className="h-11"
        disabled={isLoading || !text.trim()}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
