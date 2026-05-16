"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactResult = { success: boolean; error?: string };

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();

  if (name.length < 2)
    return { success: false, error: "El nombre debe tener al menos 2 caracteres." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, error: "El email no es válido." };
  if (message.length < 10)
    return { success: false, error: "El mensaje debe tener al menos 10 caracteres." };

  const supabase = createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { success: false, error: "No se pudo enviar el mensaje. Intenta de nuevo." };
  }

  return { success: true };
}
