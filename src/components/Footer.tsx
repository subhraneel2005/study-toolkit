import Link from "next/link";
import { Sparkles, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-white text-black flex items-center justify-center">
                <Sparkles className="h-3 w-3 fill-current" />
              </div>
              <span className="font-bold text-white">Scholar.ai</span>
            </div>
            <p className="text-sm text-zinc-500">
              The agentic workspace for the next generation of researchers.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2025 Scholar AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
