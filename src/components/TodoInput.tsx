import React, { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoInput: React.FC = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() === "") return; // Prevent adding empty todos
    addTodo(text.trim());
    setText(""); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1"
        aria-label="Todo input"
      />
      <Button type="submit" variant="default">
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
