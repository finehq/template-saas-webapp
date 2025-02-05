import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import TodoItem from "@/components/todo/TodoItem";
import TodoForm from "@/components/todo/TodoForm";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Task, PriorityLevel, Category } from "@/types/todo";
import { cn } from "@/lib/utils";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(true);

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const addTask = (newTask: Omit<Task, "id" | "completed">) => {
    const taskWithId: Task = {
      ...newTask,
      id: `${Date.now()}`,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm">List View</span>
          <Switch
            checked={isListView}
            onCheckedChange={setIsListView}
            className="h-5 w-9"
          />
          <span className="text-sm">Calendar View</span>
        </div>
      </div>

      <TodoForm
        onSubmit={(data) =>
          addTask({
            title: data.title,
            description: data.description,
            category: data.category as Category,
            dueDate: data.dueDate,
            priority: data.priority as PriorityLevel,
          })
        }
      />

      {isListView ? (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-center text-muted-foreground">
              No tasks found. Add a new task to get started!
            </p>
          )}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          Calendar view is under construction.
        </div>
      )}
    </div>
  );
};

export default TodoList;
