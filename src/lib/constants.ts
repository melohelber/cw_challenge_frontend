export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const ROUTES = {
  LOGIN: "/login",
  CHAT: "/chat",
} as const;

export const MESSAGE_MAX_LENGTH = 2000;

export const SUGGESTION_PROMPTS = [
  "Quais as taxas do Pix na InfinitePay?",
  "Meu histórico de transações",
  "Falar com um atendente",
];
