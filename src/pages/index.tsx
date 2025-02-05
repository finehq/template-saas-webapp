// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState, useEffect } from "react";
import TaskForm from "@/components/todo/TaskForm";
import TaskList from "@/components/todo/TaskList";

const Index = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.title = "To-Do List - Fine";
  }, []);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">To-Do List</h1>
        <p className="text-gray-600">Organize your tasks efficiently</p>
      </header>
      <main className="space-y-6">
        <TaskForm onSubmit={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleTaskCompletion}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
};

export default Index;