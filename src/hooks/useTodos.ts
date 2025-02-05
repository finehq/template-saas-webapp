import { useState, useEffect, useCallback } from "react";
import { Todoz } from "@/types/todo";

const LOCAL_STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Initialize state from localStorage
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Add a new to-do
  const addTodo = useCallback((text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  }, []);

  // Toggle a to-do's completion status
  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Remove a to-do
  const removeTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
