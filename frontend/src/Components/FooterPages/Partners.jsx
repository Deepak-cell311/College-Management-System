import Header from "../Navbar_landing";
import Footer from "../Footer";

import { 
  Handshake, 
  TrendingUp, 
  Award,
  Users,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Partners = () => {
  const partnerTypes = [
    {
      icon: Handshake,
      title: "Reseller Partners",
      description: "Sell Apex Campus solutions to educational institutions in your region and earn competitive commissions.",
      benefits: ["Up to 30% recurring commission", "Sales enablement training", "Marketing support", "Dedicated partner manager"],
    },
    {
      icon: Zap,
      title: "Implementation Partners",
      description: "Help institutions deploy and customize Apex Campus solutions. Perfect for IT consultancies.",
      benefits: ["Implementation certification", "Technical training", "Project referrals", "Priority support access"],
    },
    {
      icon: Globe,
      title: "Technology Partners",
      description: "Integrate your solutions with Apex Campus to provide enhanced value to mutual customers.",
      benefits: ["API access", "Co-marketing opportunities", "Joint solution development", "Technical documentation"],
    },
  ];

  const whyPartner = [
    { stat: "500+", label: "Institutions trust our platform" },
    { stat: "2M+", label: "Students managed globally" },
    { stat: "40%", label: "YoY partner revenue growth" },
    { stat: "95%", label: "Partner satisfaction rate" },
  ];

  const featuredPartners = [
    "TechEd Solutions", "EduTech Consulting", "Campus IT Services", 
    "Learning Systems Inc", "Academic Partners", "EduCloud Services"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                Partner With Us
              </h1>
              <p className="mt-6 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms] md:text-xl">
                Join our growing ecosystem of partners and help transform education management across the globe.
              </p>
              <div className="mt-8 animate-fade-up [animation-delay:200ms]">
                <button size="lg" variant="secondary" className="gap-2">
                  Become a Partner
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner Stats */}
        <section className="border-b border-border bg-card py-12">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {whyPartner.map((item, index) => (
                <div 
                  key={item.label} 
                  className="animate-fade-up text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-3xl font-bold text-gradient md:text-4xl">{item.stat}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Partnership Programs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the partnership model that best fits your business.
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {partnerTypes.map((type, index) => (
                <div
                  key={type.title}
                  className="animate-fade-up rounded-xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <type.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{type.title}</h3>
                  <p className="mb-6 text-muted-foreground">{type.description}</p>
                  <ul className="space-y-3">
                    {type.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full">Learn More</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Why Partner With Apex Campus?
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Growing Market</h3>
                      <p className="mt-1 text-muted-foreground">
                        The EdTech market is projected to reach $400B by 2028. Position yourself in this high-growth sector.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Award-Winning Platform</h3>
                      <p className="mt-1 text-muted-foreground">
                        Represent a solution recognized by industry analysts and loved by customers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Dedicated Support</h3>
                      <p className="mt-1 text-muted-foreground">
                        Get a dedicated partner manager, training resources, and priority technical support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-hero-gradient p-8 shadow-2xl md:p-12">
                <h3 className="text-2xl font-bold text-primary-foreground">Partner Success Story</h3>
                <blockquote className="mt-6 text-primary-foreground/90">
                  "Partnering with Apex Campus has been transformative for our business. In just 18 months, we've helped 50+ institutions modernize their operations and grown our revenue by 200%."
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-primary-foreground">Vikram Mehta</p>
                  <p className="text-sm text-primary-foreground/70">CEO, EduTech Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Our Partner Network</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join these leading organizations in our partner ecosystem.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {featuredPartners.map((partner, index) => (
                <div
                  key={partner}
                  className="animate-fade-up flex h-24 items-center justify-center rounded-xl border border-border bg-card px-4 text-center shadow-sm transition-all hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-muted-foreground">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-2xl bg-hero-gradient p-8 text-center shadow-xl md:p-12">
              <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                Ready to Grow Together?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Apply to become a partner today. Our team will review your application and get back to you within 48 hours.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button size="lg" variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                  Contact Partner Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
