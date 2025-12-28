/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { CardDescription, CardTitle } from "@/components/ui/card";

import { authClient, signIn } from "@/lib/auth-client";
import Image from "next/image";

interface SigninProps {
  onNext: () => void;
  onBack?: () => void;
}

const signInGoogle = async () => {
  try {
    await signIn();
  } catch (error) {
    console.error(error);
  }
};

export default function SigninScreen() {
  return (
    <div className="min-h-screen w-full justify-center items-center bg-background text-foreground flex flex-col">
      <div className="space-y-4">
        {/* Clean Header */}
        <div className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to access your tools and configurations.
          </CardDescription>
        </div>

        <Button
          className="w-full flex gap-2 justify-center items-center"
          onClick={signInGoogle}
        >
          <Image src={"/google.png"} width={20} height={20} alt="google-logo" />
          Sigin with Google
        </Button>
      </div>
    </div>
  );
}
