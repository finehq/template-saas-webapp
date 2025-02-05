import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";

const TaskList: React.FC = () => {
  const { tasks, toggleTask, removeTask } = useTasks();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              aria-label={`Mark task "${task.text}" as completed`}
            />
            <span
              className={`text-sm ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.text}
            </span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeTask(task.id)}
            aria-label={`Delete task "${task.text}"`}
          >
            Delete
          </Button>
        </Card>
      ))}
      {tasks.length === 0 && (
        <Card className="p-4 text-center text-muted-foreground">
          <CardContent>No tasks available. Add a new task to get started!</CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskList;
