// start the app always with '/' route
import Banner from "@/components/layout/Banner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/layout/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./lib/auth";
import AuthGuard from "./components/layout/AuthGuard";
import Navbar from "./components/layout/Navbar";

import "./index.css";
import Index from "./pages";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import TodoPage from "./pages/todo";

// Set page title
document.title = "Todo App - Fine";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <TooltipProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route 
                  path="/todo" 
                  element={
                    <AuthGuard>
                      <TodoPage />
                    </AuthGuard>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Sonner />
              <Toaster />
              <Banner />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </SidebarProvider>
  </QueryClientProvider>
);