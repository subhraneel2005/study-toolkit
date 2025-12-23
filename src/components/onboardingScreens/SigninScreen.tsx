/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { authClient } from "@/lib/auth-client";
import VerifyOtp from "../VerifyOtpModal";

const signinSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

interface SigninProps {
  onNext: () => void;
  onBack?: () => void;
}

export default function SigninScreen({ onNext }: SigninProps) {
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
        // Handle unverified email case
        if (response.error.message?.toLowerCase().includes("verify")) {
          setError("Please verify your email first. Sending code...");
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

      // Success: Proceed to the next step (API Keys)
      onNext();
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      {/* Clean Header */}
      <div className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to access your tools and configurations.
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="py-3">
            <AlertDescription className="text-sm font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="nugget@example.com"
              type="email"
              className="bg-muted/30"
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-xs text-primary hover:underline font-medium"
                onClick={() => console.log("Forgot password logic")}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                className="bg-muted/30 pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 py-1">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal text-muted-foreground cursor-pointer select-none"
          >
            Keep me signed in for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="relative flex items-center py-2">
          <Separator className="flex-1" />
          <span className="mx-4 text-xs text-muted-foreground uppercase tracking-wider">
            Or continue with
          </span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          type="button"
          disabled
          className="w-full bg-background hover:bg-muted/50 transition-colors opacity-70"
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
          Google Login (Soon)
        </Button>
      </form>

      {showOtpDialog && (
        <VerifyOtp
          email={userEmail}
          open={showOtpDialog}
          onOpenChange={setShowOtpDialog}
          onNext={onNext}
        />
      )}
    </div>
  );
}
