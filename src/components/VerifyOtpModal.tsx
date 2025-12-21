"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";

export const title = "OTP Code";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

type OtpFormData = z.infer<typeof otpSchema>;

interface VerifyOtpProps {
  children?: React.ReactNode;
  email?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onNext: () => void;
}

export default function VerifyOtp({
  children,
  email,
  open: controlledOpen,
  onOpenChange,
  onNext,
}: VerifyOtpProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
  });

  const otp = watch("otp");

  // Auto-close dialog after successful verification
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        // Reset form and states when closing
        reset();
        setSuccess(false);
        setErrorMessage(null);

        onNext();
      }, 2000); // Close after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [success, setIsOpen, reset]);

  // Reset states when dialog closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setSuccess(false);
      setErrorMessage(null);
      setIsLoading(false);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: OtpFormData) => {
    if (!email) {
      setErrorMessage(
        "Email not found. Please go back and enter your email again."
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await authClient.emailOtp.verifyEmail({
        email,
        otp: data.otp,
      });

      console.log("OTP Verification Response:", res);

      if (res.data?.status || res.data) {
        setSuccess(true);
        setErrorMessage(null);
      } else if (res.error) {
        setErrorMessage(res.error.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      // Show success message briefly
      setErrorMessage(null);
      alert("New code sent! Check your email.");
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to resend code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            We&apos;ve sent a 6-digit code to <strong>{email}</strong>. Please
            enter it below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
          }}
          className="mt-4"
        >
          <div className="space-y-2">
            {/* Invalid State */}
            {errorMessage && !isLoading && !success && (
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className={errorMessage ? "animate-shake" : ""}>
                    <InputOTP
                      maxLength={6}
                      value={field.value || ""}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={0} />
                        <InputOTPSlot className="bg-background" index={1} />
                        <InputOTPSlot className="bg-background" index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={3} />
                        <InputOTPSlot className="bg-background" index={4} />
                        <InputOTPSlot className="bg-background" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-destructive text-sm mt-2">
                      {errorMessage}
                    </p>
                  </div>
                )}
              />
            )}

            {/* Verifying State */}
            {isLoading && !success && (
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={6}
                      value={field.value || ""}
                      onChange={field.onChange}
                      disabled
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={0} />
                        <InputOTPSlot className="bg-background" index={1} />
                        <InputOTPSlot className="bg-background" index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={3} />
                        <InputOTPSlot className="bg-background" index={4} />
                        <InputOTPSlot className="bg-background" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying code...</span>
                    </div>
                  </div>
                )}
              />
            )}

            {/* Success State */}
            {success && (
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <InputOTP
                      disabled
                      maxLength={6}
                      value={field.value || ""}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={0}
                        />
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={1}
                        />
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={2}
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={3}
                        />
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={4}
                        />
                        <InputOTPSlot
                          className="bg-background border-green-500"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Code verified successfully! Redirecting...</span>
                    </div>
                  </div>
                )}
              />
            )}

            {/* Default (Idle) State */}
            {!isLoading && !success && !errorMessage && (
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value || ""}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className="bg-background" index={0} />
                      <InputOTPSlot className="bg-background" index={1} />
                      <InputOTPSlot className="bg-background" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="bg-background" index={3} />
                      <InputOTPSlot className="bg-background" index={4} />
                      <InputOTPSlot className="bg-background" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            )}

            {/* Resend Button */}
            {!success && (
              <p className="text-center text-muted-foreground text-sm mt-3">
                Didn&apos;t receive the code?{" "}
                <button
                  className="font-medium underline text-blue-600 cursor-pointer hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                >
                  Resend
                </button>
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            {!success && (
              <Button
                disabled={(otp?.length ?? 0) !== 6 || isLoading}
                type="submit"
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
