import { UIMessagePart } from "ai";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  parts: UIMessagePart<any, any>[];
  metaData?: any;
  createdAt: number;
}
