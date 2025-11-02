"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { VerifiedIcon, CalendarDays, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
}

export function UserHoverCard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session?.data?.user as User);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-fit">
        <Avatar className="rounded-lg">
          <AvatarFallback className="rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userImage = user.image || "https://github.com/shadcn.png";
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative w-fit cursor-pointer">
          <Avatar className="rounded-lg">
            <AvatarImage alt={user.name} src={userImage} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          {user.emailVerified && (
            <span className="-bottom-1 -right-1 absolute flex size-4 items-center justify-center rounded-full bg-background">
              <VerifiedIcon className="size-full fill-blue-500 text-white" />
            </span>
          )}
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userImage} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-1">
                {user.name}
                {user.emailVerified && (
                  <VerifiedIcon className="h-3 w-3 fill-blue-500 text-white" />
                )}
              </h4>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <CalendarDays className="h-3 w-3" />
              <span>Joined {joinedDate}</span>
            </div>

            {!user.emailVerified && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-2">
                <p className="text-yellow-800 dark:text-yellow-200 text-xs">
                  Email not verified
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => router.push("/profile")}
          >
            View Profile
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
