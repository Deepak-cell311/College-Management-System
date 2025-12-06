import Header from "../Navbar_landing";
import Footer from "../Footer";

import { 
  FileText, 
  Video, 
  BookOpen, 
  Download,
  ArrowRight,
  PlayCircle,
  FileDown,
  Presentation
} from "lucide-react";

const Resources = () => {
  const resourceTypes = [
    {
      icon: FileText,
      title: "Whitepapers",
      description: "In-depth research and analysis on education technology trends.",
      count: "12 resources",
    },
    {
      icon: Video,
      title: "Webinars",
      description: "Expert-led sessions on best practices and product features.",
      count: "24 recordings",
    },
    {
      icon: BookOpen,
      title: "Guides",
      description: "Step-by-step tutorials and implementation guides.",
      count: "18 guides",
    },
    {
      icon: Presentation,
      title: "Case Studies",
      description: "Real success stories from institutions using Apex Campus.",
      count: "15 stories",
    },
  ];

  const featuredResources = [
    {
      type: "Whitepaper",
      icon: FileDown,
      title: "The State of EdTech 2025: Trends and Predictions",
      description: "A comprehensive report on emerging technologies shaping education management.",
      downloadCount: "2,500+ downloads",
    },
    {
      type: "Webinar",
      icon: PlayCircle,
      title: "Mastering Student Lifecycle Management",
      description: "Learn how to optimize every stage from admission to alumni engagement.",
      downloadCount: "1,800+ views",
    },
    {
      type: "Guide",
      icon: BookOpen,
      title: "Complete Guide to Digital Transformation",
      description: "A step-by-step roadmap for modernizing your institution's operations.",
      downloadCount: "3,200+ downloads",
    },
  ];

  const allResources = [
    { title: "ROI Calculator for Campus Management", type: "Tool", icon: FileText },
    { title: "Data Migration Best Practices", type: "Guide", icon: BookOpen },
    { title: "Security & Compliance Checklist", type: "Checklist", icon: FileText },
    { title: "API Documentation", type: "Technical", icon: FileText },
    { title: "Product Demo Video Series", type: "Video", icon: Video },
    { title: "Implementation Timeline Template", type: "Template", icon: FileText },
    { title: "Change Management Handbook", type: "Guide", icon: BookOpen },
    { title: "Integration Partner Directory", type: "Directory", icon: FileText },
    { title: "Student Success Metrics Guide", type: "Guide", icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Resource Center
              </h1>
              <p className="mt-4 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms]">
                Guides, templates, webinars, and tools to help you succeed with Apex Campus.
              </p>
            </div>
          </div>
        </section>

        {/* Resource Types */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {resourceTypes.map((type, index) => (
                <div
                  key={type.title}
                  className="animate-fade-up group cursor-pointer rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                    <type.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                  <p className="mt-3 text-xs font-medium text-primary">{type.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Resources</h2>
              <button variant="outline" className="hidden gap-2 sm:flex">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {featuredResources.map((resource, index) => (
                <div
                  key={resource.title}
                  className="animate-fade-up group rounded-xl border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex aspect-video items-center justify-center rounded-t-xl bg-hero-gradient">
                    <resource.icon className="h-16 w-16 text-primary-foreground/50" />
                  </div>
                  <div className="p-6">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {resource.type}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{resource.downloadCount}</span>
                      <button size="sm" variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Resources */}
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">All Resources</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allResources.map((resource, index) => (
                <div
                  key={resource.title}
                  className="animate-fade-up group flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <resource.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button variant="outline" size="lg" className="gap-2">
                Load More Resources
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-2xl bg-hero-gradient p-8 text-center shadow-xl md:p-12">
              <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                Need a Custom Resource?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Our team can create tailored materials for your institution's specific needs.
              </p>
              <button size="lg" variant="secondary" className="mt-8 gap-2">
                Request Custom Resource
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
