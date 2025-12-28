"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignupScreen from "./SignupScreen";
import ApiKeysScreen from "./ApiKeysScreen";
import { authClient } from "@/lib/auth-client";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const { data: session, isPending } = authClient?.useSession();

  useEffect(() => {
    if (!isPending && session) {
      setCurrentStep(2);
    }
  }, [session, isPending]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-[550px] shadow-lg border-muted/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i + 1 <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              step {currentStep} of {totalSteps}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {currentStep === 1 && <SignupScreen onNext={() => {}} />}
          {currentStep === 2 && <ApiKeysScreen onNext={() => {}} />}
        </CardContent>
      </Card>
    </div>
  );
}
