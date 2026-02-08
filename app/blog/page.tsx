import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description: "Engineering thoughts, tutorials, and insights.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
      En este blog comparto notas técnicas, reflexiones y aprendizajes derivados de proyectos profesionales, académicos y personales.
      Las entradas abordan decisiones de diseño, experiencias de implementación y conceptos de ingeniería de software desde una perspectiva práctica.
      El contenido está pensado como documentación viva y como espacio para profundizar en temas específicos.

      </p>

      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay entradas disponibles aún.
        </p>
      )}
    </div>
  );
}
