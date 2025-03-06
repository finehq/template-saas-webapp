import React from "react";
import { TodoFilter as FilterType } from "@/lib/fine";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TodoFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    total: number;
    active: number;
    completed: number;
  };
  className?: string;
}

const TodoFilter = ({
  activeFilter,
  onFilterChange,
  counts,
  className,
}: TodoFilterProps) => {
  return (
    <div className={className}>
      <Tabs
        defaultValue={activeFilter}
        value={activeFilter}
        onValueChange={(value) => onFilterChange(value as FilterType)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all" className="flex-1">
            All ({counts.total})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1">
            Active ({counts.active})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Completed ({counts.completed})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TodoFilter;
