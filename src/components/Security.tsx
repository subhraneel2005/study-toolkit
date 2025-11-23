import { Lock, ShieldCheck, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Security() {
  return (
    <section
      id="security"
      className="py-24 border-b border-white/10 bg-zinc-900/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-mono mb-2">
              <ShieldCheck className="w-3 h-3" />
              Enterprise Grade Security
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Bring Your Own Keys. <br />
              <span className="text-zinc-500">Your Data Stays Yours.</span>
            </h2>
            <p className="text-lg text-zinc-400">
              We never store your raw API keys. They are encrypted client-side
              and signed with a secret hash before ever touching our servers.
              You maintain full control over your usage and costs.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-zinc-300">
                <div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center border border-white/10">
                  <Key className="w-3 h-3" />
                </div>
                AES-256 Encryption for stored credentials
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center border border-white/10">
                  <Lock className="w-3 h-3" />
                </div>
                Email OTP Verification Flow
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                No training on your private data
              </li>
            </ul>
          </div>

          <div className="w-full max-w-md relative">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl -z-10 rounded-full" />
            <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">
                    OpenAI API Key
                  </label>
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 bg-zinc-900 border border-white/10 rounded flex items-center px-3 text-zinc-500 font-mono text-sm">
                      sk-proj-••••••••••••••••
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-white">
                      End-to-End Encrypted
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Your keys are encrypted using a session-specific signature
                      before transmission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
