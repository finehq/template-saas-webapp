import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";

const AddTask: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskText.trim() === "") return;

    addTask(taskText.trim());
    setTaskText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md"
    >
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="flex-1"
        aria-label="Task input"
      />
      <Button type="submit" variant="default">
        Add
      </Button>
    </form>
  );
};

export default AddTask;
