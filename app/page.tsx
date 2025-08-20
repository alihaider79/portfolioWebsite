import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Services />
      <Experience />
    </div>
  );
}
