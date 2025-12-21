import z from "zod";

const apiKeysSchema = z.object({
  geminiKey: z.string(),
  serperKey: z.string().optional(),
});

type ApiKeysPayload = z.infer<typeof apiKeysSchema>;

export { apiKeysSchema };
export type { ApiKeysPayload };
