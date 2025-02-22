import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";



export default function Home() {
  return (
    <main className="relative bg-shadow flex flex-col justify-center items-center overflow-hidden mx-auto sm:px-10 px-5">
      <div>
        <FloatingNav navItems={ navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Process  />
        <Pricing />
        <Footer />
      </div>
    </main>
    
  );
}
