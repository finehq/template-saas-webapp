import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Todo = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return; // Ignore empty inputs
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput(""); // Clear input field
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
      <div className="w-full max-w-md flex items-center gap-2 mb-6">
        <Input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="h-11 px-4 border border-gray-300 rounded-md"
        />
        <Button onClick={addTask} className="h-11 px-4 bg-primary text-white rounded-md hover:bg-primary/90">
          Add
        </Button>
      </div>
      <div className="w-full max-w-md space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between p-4">
            <CardContent className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleComplete(task.id)}
                className="h-5 w-5"
              />
              <span
                className={`text-lg ${
                  task.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:bg-red-100"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Todo;
