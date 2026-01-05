// src/components/ProfileSettings.tsx
"use client";

import { useEffect, useState } from "react";
import { Key, Coins, User, Mail, ExternalLink, HelpCircle } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfileLoadingSkeleton from "./ProfileLoadingSkeleton";
import { getUserProfile } from "@/app/actions/getUserProfile";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ProfileSettings() {
  const { isLoading: authStoreLoading } = useAuthStore();
  const [userProfile, setUserProfile] = useState<Awaited<
    ReturnType<typeof getUserProfile>
  > | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      setProfileLoading(true);
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (e) {
        console.error("Failed to fetch user profile:", e);
      } finally {
        setProfileLoading(false);
      }
    }

    if (!authStoreLoading) {
      fetchUserProfile();
    }
  }, [authStoreLoading]);

  if (authStoreLoading || profileLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (!userProfile) {
    return (
      <div className="mt-8 text-sm text-muted-foreground">
        Profile not found.
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "NN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-full max-w-2xl mt-8 space-y-10 text-left">
      {/* --- API Keys Section --- */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            API Keys
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your Google Gemini credentials for AI features.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="gemini-key" className="text-sm font-medium">
              Google Gemini API Key
            </Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent side="top" className="w-80">
                <p className="text-xs leading-relaxed">
                  Get your key from the{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    className="text-primary hover:underline inline-flex items-center gap-0.5"
                  >
                    Google AI Studio <ExternalLink className="h-3 w-3" />
                  </a>
                  .
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="relative">
            <img
              src="/gemini.png"
              alt="Gemini"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
            />
            <Input
              id="gemini-key"
              value={
                userProfile.geminiKey ? "••••••••••••••••••••••••••••" : ""
              }
              placeholder="No Key provided, using credits"
              readOnly
              className="pl-10 bg-muted/30 font-mono text-xs"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* --- Credits Section --- */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            Usage & Credits
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitor your available AI credits.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50 inline-flex flex-col gap-1 min-w-[200px]">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Available Credits
          </span>
          <span className="text-3xl font-bold text-primary">
            {userProfile.credits ?? 0}
          </span>
        </div>
      </section>

      <Separator />

      {/* --- Profile Information Section --- */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Profile Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Basic account details synced from your login provider.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={userProfile.image!} />
              <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{userProfile.name || "Student"}</p>
              <p className="text-xs text-muted-foreground">Account active</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5">
                <User className="h-3 w-3" /> Full Name
              </Label>
              <Input
                value={userProfile.name || ""}
                readOnly
                className="bg-muted/30 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5">
                <Mail className="h-3 w-3" /> Email Address
              </Label>
              <Input
                value={userProfile.email || ""}
                readOnly
                className="bg-muted/30 text-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
