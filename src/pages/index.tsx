import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ListTodo } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import TodoFilter from "@/components/todo/TodoFilter";
import { useTodoStore } from "@/store/todo-store";

const Index = () => {
  const { getTodoCount } = useTodoStore();
  const { total, completed } = getTodoCount();

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-6 w-6 text-primary" />
                  <span>Todo List</span>
                </div>
                {total > 0 && (
                  <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary/70" />
                    <span>
                      {completed} of {total} completed
                    </span>
                  </div>
                )}
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-4">
              <TodoInput />
              <TodoFilter />
              <TodoList />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default Index;