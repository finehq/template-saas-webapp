import Banner from "@/components/Banner";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";

import { TooltipProvider } from "./components/ui/tooltip";

import { SidebarProvider } from "./components/ui/sidebar";
import "./index.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter>
        <Sonner />
        <Toaster />
        <Banner />
      </TooltipProvider>
    </SidebarProvider>
  </QueryClientProvider>
);
