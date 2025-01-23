import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages";

import { TooltipProvider } from "./components/ui/tooltip";

import "./index.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={MainPage} />
        </Routes>
      </BrowserRouter>
      <Sonner />
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);
