"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserHoverCard } from "./UserHoverCard";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/stores/useAuthStore";
import { authClient, signIn } from "@/lib/auth-client";
import Image from "next/image";

export default function TopNav() {
  const pathname = usePathname();

  const isCanvas = pathname === "/canvas";
  const isTools = pathname.startsWith("/tools");
  const isProfile = pathname.startsWith("/profile");

  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const { user, setUser, isLoading, setIsLoading } = useAuthStore();

  const fetchUser = async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUser(session.data.user);
      }
    } catch (error) {
      console.log("Failed to fetch user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/api/auth/post-signup",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [setUser, setIsLoading, pathname]);

  return (
    <div className="h-16 justify-start items-center px-2 w-full border-b border-border flex gap-4 fixed top-0 left-0 right-0 bg-background z-50">
      {(isCanvas || isTools || isProfile) && <Sidebar />}
      <nav className="flex">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

        {user ? (
          <>
            {" "}
            <Link href={"/tools"}>
              <Button variant="ghost" className="cursor-pointer ">
                Tools
              </Button>
            </Link>
            <Link href={"/profile"}>
              <Button variant="ghost" className="cursor-pointer mr-3">
                Profile
              </Button>
            </Link>
            {!isLoading && <UserHoverCard />}
          </>
        ) : (
          <Button
            className="ml-4 border border-border"
            variant={"secondary"}
            onClick={signInGoogle}
          >
            <Image
              width={15}
              height={15}
              alt="google-icon"
              src={"/google.png"}
            />
            Signin
          </Button>
        )}
      </nav>
    </div>
  );
}
