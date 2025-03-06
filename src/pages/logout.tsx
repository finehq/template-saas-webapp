import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

const LogoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, you would call your auth service here
      // await authService.logout();
      
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-md mx-auto">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Log Out</CardTitle>
            <CardDescription className="text-center">
              Are you sure you want to log out of your account?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4">
            <LogOut className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              You will need to log in again to access your account and todos.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={handleLogout} 
              className="w-full h-11"
              disabled={isLoading}
              variant="destructive"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Logging out...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </div>
              )}
            </Button>
            <Button 
              onClick={handleCancel} 
              className="w-full h-11"
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <div className="text-xs text-center text-muted-foreground pt-2">
              <Link to="/todo" className="hover:underline">
                Return to your todos
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default LogoutPage;
