import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodos } from "@/hooks/useTodos";

const TodoList = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Form for adding new to-dos */}
      <form onSubmit={handleAddTodo} className="flex items-center gap-2 mb-4">
        <Input
          className="h-11 flex-1"
          placeholder="Add a new to-do"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          aria-label="New to-do"
        />
        <Button type="submit" className="h-11">
          Add
        </Button>
      </form>

      {/* List of to-dos */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="flex items-center justify-between">
            <CardContent className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                aria-label={`Mark ${todo.text} as ${
                  todo.completed ? "incomplete" : "complete"
                }`}
              />
              <span
                className={`text-sm ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </span>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeTodo(todo.id)}
                aria-label={`Delete ${todo.text}`}
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

export default TodoList;
