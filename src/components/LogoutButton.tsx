"use client";

import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push(ROUTES.LOGIN);
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
    >
      <LogoutIcon />
      Sair
    </button>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
