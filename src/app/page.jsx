import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Work from "@/sections/Work";
import Experience from "@/sections/Experience";
import Automation from "@/sections/Automation";
import Features from "@/sections/Features";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Services />
        <Work />
        <Experience />
        <Automation />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
