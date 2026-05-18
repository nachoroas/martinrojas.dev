"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded border border-gray-700 px-3 py-1 text-sm text-gray-400 hover:border-gray-500 hover:text-white"
    >
      Sign out
    </button>
  );
}
