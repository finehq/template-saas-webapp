import React from "react";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FilterType, useTodoStore } from "@/store/todo-store";

const TodoFilter = () => {
  const { filter, setFilter, getTodoCount } = useTodoStore();
  const { total, active, completed } = getTodoCount();

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between mb-4"
    >
      <div className="hidden sm:block">
        <Tabs 
          defaultValue={filter} 
          value={filter} 
          onValueChange={handleFilterChange}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">
              All
              {total > 0 && <span className="ml-1 text-xs opacity-70">({total})</span>}
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              {active > 0 && <span className="ml-1 text-xs opacity-70">({active})</span>}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completed > 0 && <span className="ml-1 text-xs opacity-70">({completed})</span>}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-4 w-4 mr-2" />
              {filter === "all" ? "All" : filter === "active" ? "Active" : "Completed"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>
              All {total > 0 && <span className="ml-1 text-xs opacity-70">({total})</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("active")}>
              Active {active > 0 && <span className="ml-1 text-xs opacity-70">({active})</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("completed")}>
              Completed {completed > 0 && <span className="ml-1 text-xs opacity-70">({completed})</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-xs text-muted-foreground">
        {active === 1 ? '1 task left' : `${active} tasks left`}
      </div>
    </motion.div>
  );
};

export default TodoFilter;
