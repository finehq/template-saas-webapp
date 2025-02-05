import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

// Define the TypeScript type for the task props
export interface TaskItemProps {
  id: string;
  title: string;
  category: string;
  dueDate: Date | null;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  category,
  dueDate,
  completed,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 p-4 transition-shadow hover:shadow-lg",
        completed && "opacity-70"
      )}
    >
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggleComplete(id)}
            className="transition-transform data-[state=checked]:scale-110"
          />
          <CardTitle className={cn(completed && "line-through text-muted-foreground")}>
            {title}
          </CardTitle>
        </div>
        <Badge variant="secondary">{category}</Badge>
      </CardHeader>

      <CardContent>
        {dueDate ? (
          <p
            className={cn(
              "text-sm",
              completed ? "text-muted-foreground" : "text-foreground"
            )}
          >
            Due: {format(dueDate, "PPP")}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No due date</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(id)}
          aria-label="Edit Task"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          aria-label="Delete Task"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
