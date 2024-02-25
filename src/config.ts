import z from "zod";

const configSchema = z.object({
  VITE_BACKEND_URL: z.string(),
});

export type Config = typeof config;

export const config = configSchema.parse(import.meta.env);