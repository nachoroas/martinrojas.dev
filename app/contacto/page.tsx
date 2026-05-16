import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contacto",
  description: "Ponte en contacto conmigo.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Contacto</h1>
      <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
        Si te interesa mi trabajo, tienes alguna propuesta o simplemente quieres
        conversar, no dudes en contactarme.
      </p>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <h2 className="mb-2 text-xl font-semibold">Email</h2>
            <a
              href="mailto:mrojascornejo@gmail.com"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              mrojascornejo@gmail.com
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <h2 className="mb-2 text-xl font-semibold">LinkedIn</h2>
            <a
              href="https://linkedin.com/in/martin-rojas-c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              linkedin.com/in/martin-rojas-c
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <h2 className="mb-2 text-xl font-semibold">GitHub</h2>
            <a
              href="https://github.com/nachoroas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              github.com/nachoroas
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Formulario de Contacto</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
