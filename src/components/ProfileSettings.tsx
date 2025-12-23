"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Key } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfileLoadingSkeleton from "./ProfileLoadingSkeleton";
import { useEffect } from "react";
import { encryptOnClient } from "@/lib/clientEncryption";

export const title = "Profile Edit Form";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  googleGeminiKey: z.string().optional().or(z.literal("")),
  serperKey: z.string().optional().or(z.literal("")),
});

export default function ProfileSettings() {
  const { user, isLoading } = useAuthStore();
  const username = user?.name;
  const email = user?.email;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      googleGeminiKey: "",
      serperKey: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.name ?? "",
        email: user.email ?? "",
        googleGeminiKey: "",
        serperKey: "",
      });
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const encryptedGeminiKey = await encryptOnClient(
        values.googleGeminiKey || ""
      );
      const encryptedSerperKey = await encryptOnClient(values.serperKey || "");

      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          geminiKey: encryptedGeminiKey,
          serperKey: encryptedSerperKey,
        }),
      });

      if (!res.ok) throw new Error("Failed to update keys");

      const data = await res.json();
      console.log("✅ Keys updated:", data);

      form.reset({
        username: user?.name ?? "",
        email: user?.email ?? "",
        googleGeminiKey: "",
        serperKey: "",
      });
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  return (
    <div className="w-full max-w-2xl mt-8">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-8">
            <h3 className="font-medium text-lg">API Keys</h3>
            <p className="text-muted-foreground text-sm">
              Add/Update your API credentials
            </p>
          </div>
          {/* API Keys Section */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="googleGeminiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Google Gemini API Key</span>
                      <HoverCard>
                        <HoverCardTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </HoverCardTrigger>
                        <HoverCardContent side="right">
                          <p className="text-sm text-muted-foreground">
                            You can generate a Google Gemini API key from the{" "}
                            <a
                              href="https://aistudio.google.com/app/apikey"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline underline-offset-2"
                            >
                              Google AI Studio
                            </a>
                            . This key lets you access and integrate Gemini
                            models in your applications.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <img
                        src="/gemini.png"
                        alt="Gemini"
                        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
                      />
                      <Input
                        className="pl-10 bg-background font-mono"
                        placeholder="AIzaSyD7xQh4E-JsT8FbL2hKz9AbCdEfGhIjKlM"
                        type="password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Used for AI model integrations via Gemini API.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serperKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Serper API Key</span>
                      <HoverCard>
                        <HoverCardTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </HoverCardTrigger>
                        <HoverCardContent side="right">
                          <p className="text-sm text-muted-foreground">
                            You can generate a Serper API key from the{" "}
                            <a
                              href="https://serper.dev/api-key"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline underline-offset-2"
                            >
                              Serper.dev dashboard
                            </a>
                            . This key allows your app to perform Google Search
                            and knowledge retrieval through Serper&apos;s API.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <img
                        src="/search.png"
                        alt="Serper"
                        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
                      />
                      <Input
                        className="pl-10 bg-background font-mono"
                        placeholder="serp_8a12b34cd5ef67890ghijklmno"
                        type="password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Required for web search and data retrieval features.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>

          {/* Profile settings section */}
          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-lg">Profile Information</h3>
            <p className="text-muted-foreground text-sm">
              View profile information
            </p>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                    placeholder="johndoe"
                    readOnly
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                    placeholder="john@example.com"
                    type="email"
                    readOnly
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your email address is not publicly visible.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
