import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ListTodo } from "lucide-react";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to todo page if authenticated
    if (isAuthenticated && !isLoading) {
      navigate("/todo");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <main className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-md mx-auto">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Todo App</CardTitle>
            <CardDescription className="text-center">
              Manage your tasks efficiently with our simple todo app
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4">
            <div className="flex flex-col items-center gap-4 mb-6">
              <ListTodo className="h-16 w-16 text-primary" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="text-sm">Create and manage tasks</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="text-sm">Track your progress</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="text-sm">Stay organized and productive</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full">
              <Link to="/login">Get Started</Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Login to access your todos or create a new account
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Index;