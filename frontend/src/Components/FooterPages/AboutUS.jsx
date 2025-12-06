import Header from "../Navbar_landing";
import Footer from "../Footer";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Globe,
  Lightbulb,
  Shield
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    { value: "500+", label: "Institutions" },
    { value: "2M+", label: "Students Managed" },
    { value: "50+", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries to bring cutting-edge solutions to education.",
    },
    {
      icon: Heart,
      title: "Student-First",
      description: "Every feature we build is designed with student success in mind.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We protect sensitive educational data with enterprise-grade security.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with institutions to understand and solve their challenges.",
    },
  ];

  const team = [
    { name: "Rajesh Kumar", role: "CEO & Founder", image: "RK" },
    { name: "Priya Sharma", role: "CTO", image: "PS" },
    { name: "Amit Patel", role: "Head of Product", image: "AP" },
    { name: "Sneha Reddy", role: "Head of Customer Success", image: "SR" },
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
                About Apex Campus
              </h1>
              <p className="mt-6 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms] md:text-xl">
                Transforming education management since 2015. We're on a mission to empower institutions worldwide with intelligent solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-card py-12">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="animate-fade-up text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-3xl font-bold text-gradient md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="animate-fade-up rounded-xl border border-border bg-card p-8 shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To democratize access to world-class educational management tools, enabling institutions of all sizes to focus on what matters most: delivering exceptional learning experiences. We believe technology should simplify, not complicate, the educational journey.
                </p>
              </div>
              <div className="animate-fade-up rounded-xl border border-border bg-card p-8 shadow-lg [animation-delay:100ms]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="leading-relaxed text-muted-foreground">
                  A world where every educational institution, from small schools to large universities, has access to intelligent tools that enhance student outcomes, streamline operations, and enable data-driven decisions that shape the future of learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Our Story</h2>
              <div className="mt-8 space-y-6 text-left text-muted-foreground">
                <p className="leading-relaxed">
                  Apex Campus Solutions was founded in 2015 by a team of educators and technologists who saw firsthand the challenges institutions face with outdated, fragmented management systems. What started as a simple student information system has grown into a comprehensive platform serving over 500 institutions across 50+ countries.
                </p>
                <p className="leading-relaxed">
                  Our founders believed that educational institutions deserved the same quality of software that powers the world's leading enterprises. This belief drove us to build a platform that combines powerful functionality with an intuitive user experience.
                </p>
                <p className="leading-relaxed">
                  Today, we're proud to be trusted by schools, colleges, and universities worldwide. Our team of 200+ professionals works tirelessly to innovate and improve our platform, always keeping the needs of educators and students at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that guide everything we do.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="animate-fade-up rounded-xl border border-border bg-card p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Leadership Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Meet the people driving our mission forward.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="animate-fade-up text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-hero-gradient text-2xl font-bold text-primary-foreground shadow-lg">
                    {member.image}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Recognition</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Awards and accolades that inspire us to do better.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "EdTech Breakthrough Award 2024", subtitle: "Best Campus Management Solution" },
                { title: "G2 Leader", subtitle: "Higher Education Software - Spring 2024" },
                { title: "ISO 27001 Certified", subtitle: "Information Security Management" },
              ].map((award, index) => (
                <div
                  key={award.title}
                  className="animate-fade-up flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-muted-foreground">{award.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
