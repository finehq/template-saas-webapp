import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center gap-2 w-full"
    >
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new to-do"
        className="h-11 flex-1"
      />
      <Button type="submit" className="h-11">
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
