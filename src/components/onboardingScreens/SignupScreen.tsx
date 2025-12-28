/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { authClient, signIn } from "@/lib/auth-client";
import Image from "next/image";

interface SignupProps {
  onNext: () => void;
}

export default function SignupScreen({ onNext }: SignupProps) {
  const signInGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
      });
    } catch (error) {
      console.error(error);
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

      <Button
        className="w-full flex gap-2 justify-center items-center"
        onClick={signInGoogle}
      >
        <Image src={"/google.png"} width={20} height={20} alt="google-logo" />
        Sigup with Google
      </Button>
    </div>
  );
}
