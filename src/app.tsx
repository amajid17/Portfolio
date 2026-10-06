import { Navbar, Footer } from "./components/chrome";
import { Hero } from "./components/hero";
import { About, Skills } from "./components/about-skills";
import { EELabs, PersonalProjects } from "./components/projects";
import { SeniorDesign, Contact } from "./components/capstone-contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[#060a09] text-[#e9f1ec] bg-noise antialiased">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <EELabs />
        <PersonalProjects />
        <SeniorDesign />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
