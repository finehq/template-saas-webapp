// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoItem from "@/components/TodoItem";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    document.title = "To-do List - Fine";
  }, []);

  const addTask = () => {
    if (taskDescription.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), description: taskDescription, completed: false },
      ]);
      setTaskDescription("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">To-do List</h1>
        <div className="flex gap-2 mb-4">
          <Input
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              id={task.id}
              text={task.description}
              completed={task.completed}
              onToggle={() => toggleTaskCompletion(task.id)}
              onDelete={() => removeTask(task.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;