"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import VerifyOtp from "./VerifyOtpModal";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const signinSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: rememberMe,
      });

      if (response.error) {
        if (
          response.error.message?.includes("verify") ||
          response.error.message?.includes("verification")
        ) {
          setError(
            "Please verify your email first. We'll send you a new code."
          );

          await authClient.emailOtp.sendVerificationOtp({
            email: data.email,
            type: "email-verification",
          });

          setUserEmail(data.email);
          setShowOtpDialog(true);
          return;
        }

        setError(response.error.message || "Invalid email or password");
        return;
      }

      console.log("✅ Signed in successfully!");
      window.location.href = "/";
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="signin-screen" className="w-full">
      <Card className="max-w-md w-full mx-auto mt-24">
        <CardHeader>
          <CardTitle>Welcome back 👋</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert className="border-destructive/80 bg-destructive/5 text-destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="text-destructive/80">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <Button
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label className="font-normal text-sm">Remember me</Label>
              </div>

              <Button
                type="button"
                variant="link"
                className="px-0 text-sm"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="relative flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                Or continue with
              </span>
              <Separator className="flex-1" />
            </div>

            <Button
              disabled={true}
              className="w-full"
              variant="outline"
              type="button"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google (Soon)
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <span className="underline cursor-pointer font-medium">
              Sign up
            </span>
          </p>
        </CardFooter>
      </Card>

      {showOtpDialog && (
        <VerifyOtp
          email={userEmail}
          open={showOtpDialog}
          onOpenChange={setShowOtpDialog}
        />
      )}
    </div>
  );
}
