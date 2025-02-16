import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative bg-gray-400 flex justify-center items-center flex-col overflow-hidden mx-auto
    sm:px-10 px-5">
      <div className="max-w-7x1 w-full">
        <FloatingNav navItems={ navItems } />
        <Hero />
        <Grid />
        <RecentProjects />
      </div>
    </main>
  );
}
