import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import RecentProjects from "@/components/RecentProjects";
import SummonMjolnir from "@/components/SummonUs";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Navbar from "@/components/ui/Navbar"; // New import
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-shadow flex flex-col justify-center items-center overflow-hidden mx-auto sm:px-10 px-5 pt-56"> {/* Added pt-16 to offset Navbar height */}
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar /> {/* Add Navbar for large screens */}
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Process />
        <Pricing />
        <SummonMjolnir />
        <Footer />
      </div>
    </main>
  );
}