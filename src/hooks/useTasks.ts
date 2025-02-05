import { useState, useEffect, useCallback } from "react";
import { Task } from "@/types/task";

const LOCAL_STORAGE_KEY = "tasks";

/**
 * Custom hook to manage a to-do list with localStorage persistence.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initialization
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Add a new task to the list.
   * @param text - The text of the new task.
   */
  const addTask = useCallback((text: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  }, []);

  /**
   * Toggle the completed state of a task by its ID.
   * @param id - The ID of the task to toggle.
   */
  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  /**
   * Remove a task from the list by its ID.
   * @param id - The ID of the task to remove.
   */
  const removeTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, toggleTask, removeTask };
}
