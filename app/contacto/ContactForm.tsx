"use client";

import { useState, useTransition } from "react";
import { submitContact } from "./actions";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length < 2)
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Ingresa un email válido.";
  if (message.trim().length < 10)
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

const baseInput =
  "w-full rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white disabled:opacity-60";
const normalBorder =
  "border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700";
const errorBorder =
  "border-red-400 focus:border-red-500 focus:ring-red-400 dark:border-red-500";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setServerError(null);

    startTransition(async () => {
      const result = await submitContact(data);
      if (result.success) {
        setSuccess(true);
        form.reset();
      } else {
        setServerError(result.error ?? "Error inesperado. Intenta de nuevo.");
      }
    });
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
        <p className="font-medium text-green-800 dark:text-green-300">
          ¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          disabled={isPending}
          className={`${baseInput} ${fieldErrors.name ? errorBorder : normalBorder}`}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={isPending}
          className={`${baseInput} ${fieldErrors.email ? errorBorder : normalBorder}`}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={isPending}
          className={`${baseInput} ${fieldErrors.message ? errorBorder : normalBorder}`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        {isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
