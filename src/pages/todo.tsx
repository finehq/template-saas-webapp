import { useEffect, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { fineClient, Todo, TodoFilter } from "@/lib/fine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<TodoFilter>("all");
  const [counts, setCounts] = useState({ total: 0, active: 0, completed: 0 });

  // Load todos on initial render
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const todoData = await fineClient.getFilteredTodos(activeFilter);
        setTodos(todoData);
        const countData = await fineClient.getTodoCount();
        setCounts(countData);
      } catch (error) {
        toast.error("Failed to load todos");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [activeFilter]);

  // Add a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await fineClient.addTodo(newTodo);
      if (activeFilter === "all" || activeFilter === "active") {
        setTodos((prev) => [todo, ...prev]);
      }
      const countData = await fineClient.getTodoCount();
      setCounts(countData);
      setNewTodo("");
      toast.success("Todo added");
    } catch (error) {
      toast.error("Failed to add todo");
      console.error(error);
    }
  };

  // Toggle todo completion status
  const handleToggleTodo = async (id: string) => {
    try {
      await fineClient.toggleTodo(id);
      
      // Update the UI optimistically
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      
      // If we're filtering, we might need to remove the item from the list
      if (activeFilter !== "all") {
        setTodos((prev) => prev.filter((todo) => 
          (activeFilter === "active" && !todo.completed) || 
          (activeFilter === "completed" && todo.completed)
        ));
      }
      
      const countData = await fineClient.getTodoCount();
      setCounts(countData);
      toast.success("Todo updated");
    } catch (error) {
      toast.error("Failed to update todo");
      console.error(error);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await fineClient.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      const countData = await fineClient.getTodoCount();
      setCounts(countData);
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error(error);
    }
  };

  // Clear all completed todos
  const handleClearCompleted = async () => {
    try {
      await fineClient.clearCompleted();
      if (activeFilter !== "active") {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
      }
      const countData = await fineClient.getTodoCount();
      setCounts(countData);
      toast.success("Completed todos cleared");
    } catch (error) {
      toast.error("Failed to clear completed todos");
      console.error(error);
    }
  };

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="h-11 flex-1"
              />
              <Button type="submit" className="h-11">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </form>

            {/* Filters */}
            <Tabs defaultValue="all" value={activeFilter} onValueChange={(value) => setActiveFilter(value as TodoFilter)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">
                    All ({counts.total})
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({counts.active})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({counts.completed})
                  </TabsTrigger>
                </TabsList>
                {counts.completed > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearCompleted}
                  >
                    Clear completed
                  </Button>
                )}
              </div>

              {/* Todo Lists */}
              <TabsContent value="all" className="mt-4">
                <TodoList
                  todos={todos}
                  isLoading={isLoading}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <TodoList
                  todos={todos}
                  isLoading={isLoading}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <TodoList
                  todos={todos}
                  isLoading={isLoading}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, isLoading, onToggle, onDelete }: TodoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 h-[calc(100vh-200px)] max-h-96 overflow-y-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center p-4 border rounded-lg animate-pulse">
            <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-2">No tasks found</p>
        <p className="text-sm text-muted-foreground">
          {todos.length === 0 ? "Add a new task to get started" : "Try changing your filter"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 h-[calc(100vh-200px)] max-h-96 overflow-y-auto">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              className="h-5 w-5"
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.text}
            </label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TodoPage;
