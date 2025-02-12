import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  description?: string;
  completed: boolean;
  onToggle: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  completed,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg",
        completed ? "opacity-70" : "opacity-100"
      )}
    >
      {/* Checkbox */}
      <Checkbox checked={completed} onCheckedChange={onToggle} />

      {/* Task Content */}
      <div className="flex-1">
        <h3
          className={cn(
            "text-lg font-medium",
            completed ? "line-through text-gray-500" : "text-gray-800"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-sm",
              completed ? "line-through text-gray-400" : "text-gray-600"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
