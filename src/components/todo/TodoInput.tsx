import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todo-store";

const TodoInput = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={handleChange}
          className="h-11 pr-10"
          autoComplete="off"
        />
      </div>
      <Button 
        type="submit" 
        size="lg"
        className="h-11 px-4"
        disabled={!text.trim()}
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Task
      </Button>
    </motion.form>
  );
};

export default TodoInput;
