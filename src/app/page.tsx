"use client";
import FeaturesSection from "@/components/FeaturesScreen";
import SigninScreen from "@/components/SignInScreen";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  if (!isLoading && user) {
    router.push("/tools");
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl md:text-6xl font-bold tracking-[-2.5px]">
        Learn faster with AI
      </h1>
      <p className="mt-4 text-md max-w-2xl text-center text-muted-foreground">
        This is an AI powered learning platform with built in tools like Chat
        with pdf, web search, flashcards, summarizer and more to help you learn
        faster and retain more information.
      </p>

      <div className="flex gap-4 justify-center items-center mt-6">
        <Button
          onClick={() =>
            document.getElementById("signin-screen")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          Get Started
        </Button>

        <Button
          onClick={() =>
            document.getElementById("explore-tools")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          variant="outline"
        >
          Explore tools
        </Button>
      </div>

      <SigninScreen />

      <div className="mt-[80px]"></div>
      <FeaturesSection />
    </div>
  );
}
