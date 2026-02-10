import { API_BASE_URL, ROUTES } from "./constants";
import { getToken, clearToken } from "./auth";
import type { LoginResponse, ChatResponse } from "@/types";

class ApiClientError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiClientError";
  }
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  skipAuthInterceptor = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !skipAuthInterceptor) {
    clearToken();
    window.location.href = ROUTES.LOGIN;
    throw new ApiClientError(401, "Session expired");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail || `Request failed with status ${response.status}`;
    throw new ApiClientError(response.status, message);
  }

  return response.json() as Promise<T>;
}

export async function loginRequest(
  username: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }, true);
}

export async function sendChatMessage(
  message: string
): Promise<ChatResponse> {
  return apiFetch<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export { ApiClientError };
