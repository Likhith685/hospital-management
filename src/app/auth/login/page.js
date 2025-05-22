"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { emailLogIn } from "@/utils/authActions";
import { getUserRole } from "@/utils/server";
function Loginpage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await emailLogIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      toast("Success", {
        description: "Logged In successfully! Redirecting...",
      });
      const data=await getUserRole();
      const role=data[0].role;
       let redirectPath = '/';
      if(role=='patient')redirectPath = '/patient';
      if(role=='admin')redirectPath="/admin";
      if(role=='doctor')redirectPath="/doctor";
      router.push(redirectPath);
     
    } catch (err) {
      if (err.message) {
        toast("Error", {
          description: err.message,
        });
      } else {
        toast("Error", {
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  //Google login
  const handleGoogleLogin = async () => {};

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your hospital account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select value={role} onValueChange={setRole} disabled={isLoading}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            {role === "patient" ? (
              <div>
                Don't have an account?{" "}
                <Link
                  href="/auth/signUp"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="text-muted-foreground">
                {role === "doctor" ? "Doctors" : "Administrators"} cannot
                self-register.
                <br />
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Loginpage;
