import { getAllProjects } from "@/lib/projects";
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Proyectos",
  description: "Portfolio de proyectos profesionales, académicos y personales.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Proyectos</h1>
      <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
      En esta sección se presentan proyectos profesionales, académicos y personales que reflejan mi experiencia en desarrollo de software.
      Cada proyecto incluye contexto, arquitectura, decisiones clave y resultados, con el objetivo de mostrar tanto el proceso de diseño como la implementación técnica.
      Los proyectos destacados corresponden a trabajos con mayor impacto o responsabilidad.
      </p>
      <ProjectsClient projects={projects} />
    </div>
  );
}
