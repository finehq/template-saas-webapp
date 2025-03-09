import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { useTodoStore, Todo } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-3">
        <CardContent className="p-4 flex items-start">
          <Checkbox 
            checked={todo.completed} 
            onCheckedChange={() => toggleTodo(todo.id)}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <h3 className={cn(
              "text-lg font-medium transition-all",
              todo.completed && "line-through text-muted-foreground"
            )}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                todo.completed && "line-through opacity-70"
              )}>
                {todo.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteTodo(todo.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}