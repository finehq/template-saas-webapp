import { useTodoStore } from '@/lib/store';
import { TodoItem } from './TodoItem';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? "You don't have any todos yet. Add one above!" 
              : filter === 'active' 
                ? "You don't have any active todos." 
                : "You don't have any completed todos."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <AnimatePresence>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </AnimatePresence>
  );
}