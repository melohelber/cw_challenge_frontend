export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  agent_used: string | null;
  confidence: string | null;
  metadata: Record<string, unknown> | null;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  agentUsed?: string | null;
  confidence?: string | null;
  isError?: boolean;
}

export interface ApiError {
  status: number;
  message: string;
}
