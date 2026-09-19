import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import OrderForm from "@/components/OrderForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { getPortfolio } from "./actions/get-portfolio";

export default async function Home() {
  const { data: portfolioItems } = await getPortfolio();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <Portfolio items={portfolioItems || []} />
      <OrderForm />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}