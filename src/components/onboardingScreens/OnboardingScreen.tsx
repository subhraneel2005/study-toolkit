"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignupScreen from "./SignupScreen";
import ApiKeysScreen from "./ApiKeysScreen";
import SigninScreen from "./SigninScreen";

// --- Types ---
export type NavProps = {
  onNext: () => void;
  onBack?: () => void;
};

// --- Main Onboarding Container ---
export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  //   const back = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-[550px] shadow-lg border-muted/60">
        {/* Simple Step Indicator */}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                    i + 1 <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </CardHeader>

        {/* Step Content Render */}
        <CardContent className="pt-4">
          {currentStep === 1 && <SignupScreen onNext={next} />}
          {currentStep === 2 && <SigninScreen onNext={next} />}
          {currentStep === 3 && <ApiKeysScreen onNext={next} />}
        </CardContent>
      </Card>
    </div>
  );
}
