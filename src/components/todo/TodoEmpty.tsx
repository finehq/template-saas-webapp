import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react";

import { FilterType } from "@/store/todo-store";

interface TodoEmptyProps {
  filter: FilterType;
}

const TodoEmpty = ({ filter }: TodoEmptyProps) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case "active":
        return {
          icon: <ClipboardList className="h-12 w-12 text-muted-foreground" />,
          title: "No active tasks",
          description: "All your tasks are completed. Great job!",
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="h-12 w-12 text-muted-foreground" />,
          title: "No completed tasks",
          description: "You haven't completed any tasks yet.",
        };
      default:
        return {
          icon: <ClipboardList className="h-12 w-12 text-muted-foreground" />,
          title: "Your todo list is empty",
          description: "Add your first task using the input above.",
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border bg-card/50"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
        {content.icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{content.title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {content.description}
      </p>
    </motion.div>
  );
};

export default TodoEmpty;
