import { Features } from "./Features";
import { Hero } from "./Hero";
import { Security } from "./Security";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Hero />
      <Features />
      <Security />
      <section className="py-32 border-b border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Ready to accelerate your research?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Join thousands of students and researchers using Scholar.ai to
            discover, understand, and create faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="h-12 px-8 bg-white text-black hover:bg-zinc-200 text-base rounded-full font-medium transition-colors">
              Get Started for Free
            </button>
            <button className="h-12 px-8 border border-white/10 bg-white/5 hover:bg-white/10 text-white text-base rounded-full transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
