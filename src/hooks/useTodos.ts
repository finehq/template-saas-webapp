import { useState } from "react";

// Define the Todo type
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// Custom hook to manage the to-do list state
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to add a new to-do
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // Generate a unique ID
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to toggle the completion status of a to-do
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to remove a to-do
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Return the state and functions
  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
