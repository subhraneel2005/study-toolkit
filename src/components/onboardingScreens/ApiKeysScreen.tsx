import React, { useState } from "react";
import { CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Check, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { encryptOnClient } from "@/lib/clientEncryption";
import { ApiKeysPayload } from "@/zodSchemas/apikeysSchema";
import { addApiKey } from "@/app/actions/addApiKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ApiKeysScreen() {
  const [geminiKey, setGeminiKey] = useState<ApiKeysPayload["geminiKey"]>("");
  const [serperKey, setSerperKey] = useState<ApiKeysPayload["serperKey"]>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleFinish = async () => {
    setIsLoading(true);

    if (!geminiKey.trim()) {
      alert("Google Gemini API Key is required.");
      return;
    }

    const encryptedGeminiKey = await encryptOnClient(geminiKey);
    const encryptedSerperKey = await encryptOnClient(serperKey || "");

    try {
      const res = await addApiKey({
        geminiKey: encryptedGeminiKey,
        serperKey: encryptedSerperKey,
      });

      if (res.success) {
        toast.success("Success", {
          description:
            "Added api key(s) successfully. Your profile is now complete. Enjoy",
        });
        router.refresh();
        router.push("/tools");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        switch (error.message) {
          case "UNAUTHORIZED":
            toast.error("UNAUTHORIZED", {
              description:
                "You are not properly authenticated therefore you are not allowed to use this action.",
            });

          case "INVALID_INPUT":
            toast.error("INVALID_INPUT", {
              description:
                "You didn't provide valid inputs. Please recheck and fill it again",
            });

          case "DATABASE_ERROR":
            toast.error("DATABASE_ERROR", {
              description:
                "This is not your fault. We are facing Database issues, please try again later",
            });

          default:
            toast.error("INTERNAL_SERVER_ERROR");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-10 fade-in-50">
      <div className="space-y-2">
        <CardTitle className="text-2xl">Connect Your Intelligence</CardTitle>
        <CardDescription className="text-base">
          Add your API keys to power the AI agents.
        </CardDescription>
      </div>

      <div className="space-y-6">
        {/* Google Gemini Input (Required) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="gemini-key"
              className="flex items-center gap-2 text-base font-medium"
            >
              {/* Using a div placeholder if image fails to load for preview, replace with just Image tag in prod */}
              <div className="relative size-6 rounded-sm overflow-hidden shrink-0">
                <Image
                  src="/gemini.png"
                  alt="Gemini"
                  fill
                  className="object-contain"
                />
              </div>
              Google Gemini Key
            </Label>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Required
            </span>
          </div>
          <Input
            id="gemini-key"
            type="password"
            placeholder="AIzaSy..."
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            className="font-mono text-sm bg-muted/30"
          />
          <p className="text-xs text-muted-foreground">
            Used for powering the core reasoning capabilities of your agents.
          </p>
        </div>

        {/* Serper Input (Optional) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="serper-key"
              className="flex items-center gap-2 text-base font-medium"
            >
              <div className="relative size-6 rounded-sm overflow-hidden shrink-0 p-0.5">
                <Image
                  src="/search.png"
                  alt="Serper"
                  fill
                  className="object-contain"
                />
              </div>
              Google Serper Key
            </Label>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Optional
            </span>
          </div>
          <Input
            id="serper-key"
            type="password"
            placeholder="cbb776..."
            value={serperKey}
            onChange={(e) => setSerperKey(e.target.value)}
            className="font-mono text-sm bg-muted/30"
          />
          <p className="text-xs text-muted-foreground">
            Enables real-time web searching capabilities for research agents.
          </p>
        </div>
      </div>

      {/* Security Transparency Note */}
      <Alert className="bg-blue-50/50 border-blue-200 text-blue-900 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300">
        <ShieldAlert className="h-4 w-4 stroke-blue-600 dark:stroke-blue-400" />
        <AlertTitle className="font-semibold ml-2">
          Transparent Security
        </AlertTitle>
        <AlertDescription className="text-sm ml-2 mt-1 text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
          We value your trust. Your API keys are stored in our database using{" "}
          <strong>industry-standard 2-layer encryption</strong> (AES-256). They
          are never shared and only decrypted at runtime when you use a tool.
        </AlertDescription>
      </Alert>

      {/* Navigation Footer */}
      <CardFooter className="flex justify-between p-0 pt-4">
        <Button onClick={handleFinish} disabled={isLoading || !geminiKey}>
          {isLoading ? (
            "Finishing Setup..."
          ) : (
            <>
              Finish Setup <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
