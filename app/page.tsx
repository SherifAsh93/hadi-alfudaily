import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import OrderForm from "@/components/OrderForm";
import CtaBanner from "@/components/CtaBanner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { getPortfolio } from "./actions/get-portfolio";

export default async function Home() {
  const { data: portfolioItems } = await getPortfolio();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <div id="services">
        <Services />
      </div>
      <Showcase />
      <Process />
      <div id="about">
        <About />
      </div>
      <Portfolio items={portfolioItems || []} />
      <Testimonials />
      <CtaBanner />
      <OrderForm />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}
