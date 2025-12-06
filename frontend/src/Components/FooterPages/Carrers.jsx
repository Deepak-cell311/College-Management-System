import Header from "../Navbar_landing";
import Footer from "../Footer";

import { 
  MapPin, 
  Clock, 
  Briefcase,
  Heart,
  Coffee,
  Laptop,
  Plane,
  GraduationCap,
  Users,
  ArrowRight
} from "lucide-react";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive medical coverage for you and family" },
    { icon: Coffee, title: "Free Meals", description: "Breakfast and lunch at our office cafeteria" },
    { icon: Laptop, title: "Remote Flexibility", description: "Work from anywhere with hybrid options" },
    { icon: Plane, title: "Paid Time Off", description: "30 days annual leave plus public holidays" },
    { icon: GraduationCap, title: "Learning Budget", description: "₹50,000 annual learning and development allowance" },
    { icon: Users, title: "Team Events", description: "Regular team outings and company retreats" },
  ];

  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Bangalore / Remote",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Bangalore",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Mumbai / Hyderabad",
      type: "Full-time",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Sales Executive - Education",
      department: "Sales",
      location: "Delhi NCR",
      type: "Full-time",
    },
    {
      title: "Technical Writer",
      department: "Product",
      location: "Remote",
      type: "Full-time",
    },
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
                Join Our Mission
              </h1>
              <p className="mt-6 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms] md:text-xl">
                Help us transform education management for millions of students worldwide. We're always looking for passionate people to join our team.
              </p>
              <div className="mt-8 animate-fade-up [animation-delay:200ms]">
                <button size="lg" variant="secondary" className="gap-2">
                  View Open Positions
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Why Join Apex Campus?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We offer more than just a job. Join a team that's making a real impact in education.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="animate-fade-up rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Our Culture
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    At Apex Campus, we believe in creating an environment where everyone can do their best work. We're a diverse team of engineers, designers, educators, and business professionals united by our passion for improving education.
                  </p>
                  <p className="leading-relaxed">
                    We value transparency, collaboration, and continuous learning. Our flat hierarchy means your ideas will be heard, and your contributions will make a real difference.
                  </p>
                  <p className="leading-relaxed">
                    Whether you're working from our Bangalore office or remotely from anywhere in India, you'll be part of a supportive team that celebrates wins together and learns from challenges.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl bg-hero-gradient p-6 shadow-lg">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-4xl font-bold text-primary-foreground">200+</p>
                    <p className="mt-2 text-sm text-primary-foreground/80">Team Members</p>
                  </div>
                </div>
                <div className="aspect-square rounded-xl border border-border bg-card p-6 shadow-lg">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-4xl font-bold text-gradient">15+</p>
                    <p className="mt-2 text-sm text-muted-foreground">Cities</p>
                  </div>
                </div>
                <div className="aspect-square rounded-xl border border-border bg-card p-6 shadow-lg">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-4xl font-bold text-gradient">4.8</p>
                    <p className="mt-2 text-sm text-muted-foreground">Glassdoor Rating</p>
                  </div>
                </div>
                <div className="aspect-square rounded-xl bg-accent p-6 shadow-lg">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-4xl font-bold text-accent-foreground">92%</p>
                    <p className="mt-2 text-sm text-accent-foreground/80">Employee Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="openings" className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Open Positions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find your next opportunity with us.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {openings.map((job, index) => (
                <div
                  key={job.title}
                  className="animate-fade-up group cursor-pointer rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Don't see a role that fits? Send your resume to{" "}
                <a href="mailto:careers@apexcampus.com" className="text-primary hover:underline">
                  careers@apexcampus.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
