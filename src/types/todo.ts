export enum PriorityLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export type Category =
  | "Work"
  | "Personal"
  | "Shopping"
  | "Health"
  | "Finance"
  | "Other";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date | null;
  priority: PriorityLevel;
  category: Category;
}
