import { handlers } from "@/auth/auth";

export const { GET, POST } = handlers;
export const runtime = "edge"; // Explicitly opt into Edge Runtime