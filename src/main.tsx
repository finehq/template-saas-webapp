// start the app always with '/' route
import Banner from "@/components/layout/Banner";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { TooltipProvider } from "./components/ui/tooltip";

import { SidebarProvider } from "./components/ui/sidebar";
import "./index.css";
import Index from "./pages";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
        <Sonner />
        <Toaster />
        <Banner />
      </TooltipProvider>
    </SidebarProvider>
  </QueryClientProvider>
);
