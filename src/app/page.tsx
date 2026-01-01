"use client";
import FeaturesSection from "@/components/FeaturesScreen";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { authClient, signIn } from "@/lib/auth-client";

export default function Home() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  console.log("Current Session: " + session);

  useEffect(() => {
    if (session || (!isLoading && user)) {
      router.push("/tools");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container px-4 mx-auto text-center flex flex-col items-center">
          <Badge variant={"outline"} className="mb-4">
            v1.0 - Beta
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold md:tracking-[-4.5px] tracking-[-2.5px] max-w-4xl">
            Learn faster using AI
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            An all-in-one intelligence suite for students. Chat with PDFs,
            search the web without distractions, and generate active-recall
            flashcards instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-medium rounded-full shadow-lg shadow-primary/20"
              >
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-medium rounded-full"
              onClick={() =>
                document.getElementById("explore-tools")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              View Toolkit
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="border-t border-border/40 bg-muted/5">
        <FeaturesSection />
      </div>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Study Toolkit. Built for students.
        </p>
      </footer>
    </div>
  );
}
