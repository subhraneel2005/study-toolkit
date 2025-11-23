import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Security } from "@/components/Security";
import Waitlist from "./waitlist/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white/20">
      <Hero />
      <Features />
      <Security />
      <section className="py-32 border-b border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold tracking-[-2.2px]">
            Ready to accelerate your research?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Join thousands of students and researchers using Scholar.ai to
            discover, understand, and create faster.
          </p>
          <div className="justify-center items-center w-full max-w-md">
            <div className="flex w-full gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Join Waitlist</Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
