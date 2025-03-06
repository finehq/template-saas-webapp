import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import TodoItem from "@/components/todo/TodoItem";
import { FilterType, useTodoStore } from "@/store/todo-store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import TodoEmpty from "@/components/todo/TodoEmpty";

const TodoList = () => {
  const { 
    getFilteredTodos, 
    filter, 
    setFilter, 
    clearCompleted, 
    getTodoCount 
  } = useTodoStore();
  
  const todos = getFilteredTodos();
  const { total, active, completed } = getTodoCount();

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterType);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Tabs 
          defaultValue={filter} 
          value={filter} 
          onValueChange={handleFilterChange}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">
              All
              {total > 0 && <span className="ml-1 text-xs opacity-70">({total})</span>}
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              {active > 0 && <span className="ml-1 text-xs opacity-70">({active})</span>}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completed > 0 && <span className="ml-1 text-xs opacity-70">({completed})</span>}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {completed > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCompleted}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear completed
          </Button>
        )}
      </div>

      <div className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {todos.length > 0 ? (
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        ) : (
          <TodoEmpty filter={filter} />
        )}
      </div>
      
      <div className="text-xs text-muted-foreground mt-2">
        {active === 1 ? '1 task left' : `${active} tasks left`}
      </div>
    </div>
  );
};

export default TodoList;
