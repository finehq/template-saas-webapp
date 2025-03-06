import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  editTodo: (id: string, text: string) => void;
  getFilteredTodos: () => Todo[];
  getTodoCount: () => {
    total: number;
    active: number;
    completed: number;
  };
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',

      addTodo: (text: string) => {
        if (!text.trim()) return;
        
        const newTodo: Todo = {
          id: uuidv4(),
          text: text.trim(),
          completed: false,
          createdAt: new Date(),
        };
        
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      setFilter: (filter: FilterType) => {
        set({ filter });
      },

      editTodo: (id: string, text: string) => {
        if (!text.trim()) return;
        
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: text.trim() } : todo
          ),
        }));
      },

      getFilteredTodos: () => {
        const { todos, filter } = get();
        
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
          default:
            return todos;
        }
      },

      getTodoCount: () => {
        const { todos } = get();
        
        return {
          total: todos.length,
          active: todos.filter((todo) => !todo.completed).length,
          completed: todos.filter((todo) => todo.completed).length,
        };
      },
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);
