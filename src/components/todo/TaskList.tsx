import React from "react";
import TaskItem, { TaskItemProps } from "@/components/todo/TaskItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: TaskItemProps[];
  onAddTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask }) => {
  const hasTasks = tasks.length > 0;

  return (
    <div className="space-y-6">
      {hasTasks ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              dueDate={task.dueDate}
              completed={task.completed}
              onToggleComplete={task.onToggleComplete}
              onEdit={task.onEdit}
              onDelete={task.onDelete}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              No Tasks Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You don't have any tasks yet. Start by adding a new task!
            </p>
            <Button onClick={onAddTask} className="w-full">
              Add Task
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskList;
