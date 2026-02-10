const AGENT_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  knowledge: { label: "Knowledge", bg: "bg-blue-100", text: "text-blue-700" },
  support: { label: "Support", bg: "bg-amber-100", text: "text-amber-700" },
  slack_escalation: { label: "Escalation", bg: "bg-red-100", text: "text-red-700" },
  general: { label: "General", bg: "bg-purple-100", text: "text-purple-700" },
  guardrails: { label: "Guardrails", bg: "bg-orange-100", text: "text-orange-700" },
};

interface AgentBadgeProps {
  agentName: string;
}

export default function AgentBadge({ agentName }: AgentBadgeProps) {
  const config = AGENT_CONFIG[agentName] || {
    label: agentName,
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
