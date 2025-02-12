import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Add Task Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task Description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <Button onClick={addTask} className="self-start">
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start gap-4 p-4 bg-white rounded-lg shadow-md transition",
                task.completed ? "opacity-70" : ""
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <div className="flex-1">
                <h3
                  className={cn(
                    "text-lg font-medium",
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  )}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={cn(
                      "text-sm",
                      task.completed ? "line-through text-gray-400" : "text-gray-600"
                    )}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
