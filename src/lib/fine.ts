import { v4 as uuidv4 } from "uuid";

// Define Todo type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Define TodoFilter type
export type TodoFilter = "all" | "active" | "completed";

class FineClient {
  private todos: Todo[] = [];
  private storageKey = "fine-todos";

  constructor() {
    this.loadFromLocalStorage();
  }

  // Load todos from localStorage
  private loadFromLocalStorage(): void {
    try {
      const storedTodos = localStorage.getItem(this.storageKey);
      if (storedTodos) {
        // Parse the stored JSON and convert string dates back to Date objects
        this.todos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      this.todos = [];
    }
  }

  // Save todos to localStorage
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }

  // Get all todos
  async getTodos(): Promise<Todo[]> {
    return [...this.todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get filtered todos
  async getFilteredTodos(filter: TodoFilter): Promise<Todo[]> {
    const todos = await this.getTodos();
    
    switch (filter) {
      case "active":
        return todos.filter(todo => !todo.completed);
      case "completed":
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  // Add a new todo
  async addTodo(text: string): Promise<Todo> {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    
    return newTodo;
  }

  // Toggle todo completion status
  async toggleTodo(id: string): Promise<Todo | null> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return null;
    }
    
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      completed: !this.todos[todoIndex].completed
    };
    
    this.saveToLocalStorage();
    return this.todos[todoIndex];
  }

  // Update todo text
  async updateTodo(id: string, text: string): Promise<Todo | null> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return null;
    }
    
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      text
    };
    
    this.saveToLocalStorage();
    return this.todos[todoIndex];
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<boolean> {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    if (initialLength !== this.todos.length) {
      this.saveToLocalStorage();
      return true;
    }
    
    return false;
  }

  // Clear completed todos
  async clearCompleted(): Promise<number> {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => !todo.completed);
    
    const deletedCount = initialLength - this.todos.length;
    if (deletedCount > 0) {
      this.saveToLocalStorage();
    }
    
    return deletedCount;
  }

  // Get todo count
  async getTodoCount(): Promise<{ total: number; active: number; completed: number }> {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, active, completed };
  }
}

// Export a singleton instance
export const fineClient = new FineClient();
