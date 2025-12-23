/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { authClient } from "@/lib/auth-client";
import VerifyOtp from "../VerifyOtpModal";

const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupProps {
  onNext: () => void;
}

export default function SignupScreen({ onNext }: SignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const email = watch("email");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.username,
        callbackURL: "/",
      });

      if (response.error) {
        setError(response.error.message || "Failed to create account");
        return;
      }

      // Success: Show the OTP dialog
      setShowOtpDialog(true);
    } catch (error: any) {
      setError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      {/* Header aligned with Onboarding style */}
      <div className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription className="text-base">
          Join the toolkit to start organizing your studies.
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="animate-in shake-in-1">
            <AlertTitle>Signup Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              placeholder="cheeseNugget"
              className="bg-muted/30"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-destructive font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

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
            <Label htmlFor="password">Password</Label>
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

        {/* Trigger the VerifyOtp programmatically after signup success */}
        <VerifyOtp
          onNext={onNext}
          email={email}
          open={showOtpDialog}
          onOpenChange={setShowOtpDialog}
        >
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </VerifyOtp>

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
    </div>
  );
}
