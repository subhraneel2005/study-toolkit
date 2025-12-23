/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

import { UIMessagePart } from "ai";
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";

  parts: UIMessagePart<any, any>[];
  metaData?: any;
  createdAt: number;
}
