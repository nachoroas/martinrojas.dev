import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { getLatestPosts } from "@/lib/posts";
import ProjectCard from "@/components/ProjectCard";
import PostCard from "@/components/PostCard";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getLatestPosts(3);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
        Martin Rojas
        </h1>
        <p className="mb-2 text-xl text-gray-600 dark:text-gray-400">
          Ingeniero de Software
        </p>
        <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
        Ingeniero de software enfocado en el diseño y desarrollo de sistemas web, con interés en arquitectura, calidad de código y buenas prácticas. 
        Aquí comparto proyectos profesionales y académicos, además de notas técnicas y material de docencia de mis cursos.

        </p>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Proyectos Destacados</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/proyectos"
            className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Ver Todos los Proyectos
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Últimas Entradas del Blog</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Ver Todas las Entradas
          </Link>
        </div>
      </section>

      {/* Quick Contact Strip */}
      <section className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">¿Trabajamos juntos?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Si te interesa mi trabajo, tienes alguna propuesta o simplemente quieres conversar, no dudes en contactarme.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:mrojascornejo@gmail.com"
            className="rounded-lg bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/martin-rojas-c"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
