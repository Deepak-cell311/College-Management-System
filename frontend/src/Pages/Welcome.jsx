import { lazy, Suspense } from "react";
import Navbar from "../Components/Navbar_landing";
import Hero from "../Components/Hero";

const Features = lazy(() => import("../Components/Features"));
const Benefits = lazy(() => import("../Components/Benefits"));
const Modules = lazy(() => import("../Components/Modules"));
const CTA = lazy(() => import("../Components/CTA"));
const Footer = lazy(() => import("../Components/Footer"));

function Welcome() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden pt-20">
      <Navbar />
      <Hero />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <section id="features">
          <Features />
        </section>

        <section id="benefits">
          <Benefits />
        </section>

        <section id="modules">
          <Modules />
        </section>

        <section id="pricing">
          <CTA />
        </section>

        <section id="contact">
          <Footer />
        </section>
      </Suspense>
    </div>
  );
}

export default Welcome;
