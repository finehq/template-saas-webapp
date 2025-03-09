import { useTodoStore } from '@/lib/store';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TodoFilter() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const todos = useTodoStore((state) => state.todos);
  
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex justify-between items-center mb-6">
      <Tabs defaultValue={filter} onValueChange={(value) => setFilter(value as 'all' | 'active' | 'completed')}>
        <TabsList>
          <TabsTrigger value="all">
            All ({todos.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeTodos})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTodos})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}