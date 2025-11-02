"use client";

import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
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
  children: React.ReactNode;
  email?: string;
}

export default function VerifyOtp({ children, email }: VerifyOtpProps) {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
  });

  const otp = watch("otp");
  const onSubmit = async (data: OtpFormData) => {
    if (!email) {
      setErrorMessage(
        "Email not found. Please go back and enter your email again."
      );

      return;
    }
    setIsLoading(true);
    try {
      const res = await authClient.emailOtp.verifyEmail({
        email,
        otp: data.otp,
      });
      console.log("OTP Verification Response:", res);
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            We've sent a 6-digit code to your email address. Please enter it
            below.
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
            {isLoading && (
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
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
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Code verified successfully!</span>
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
            <p className="text-center text-muted-foreground text-sm mt-3">
              Didn&apos;t receive the code?{" "}
              <button
                className="font-medium underline text-blue-600 cursor-pointer"
                type="button"
              >
                Resend
              </button>
            </p>
          </div>

          <DialogFooter>
            <Button
              disabled={(otp?.length ?? 0) !== 6 || isLoading}
              type="submit"
            >
              Verify
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
