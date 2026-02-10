import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image
            src="/infinitepay-logo.svg"
            alt="InfinitePay Agent"
            width={220}
            height={44}
            priority
          />
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
          <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Entrar na sua conta
          </h1>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          InfinitePay Agent &middot; Powered by AI
        </p>
      </div>
    </div>
  );
}
