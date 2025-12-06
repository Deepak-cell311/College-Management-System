import Header from "../Navbar_landing";
import Footer from "../Footer";

import { 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  HelpCircle,
  FileText,
  Video,
  Users,
  Zap
} from "lucide-react";

const Support = () => {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 for Premium users",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri, 9AM-6PM IST",
      action: "Call Us",
    },
  ];

  const popularTopics = [
    { title: "Getting started with Apex Campus", icon: Zap },
    { title: "Setting up user accounts and permissions", icon: Users },
    { title: "Importing student data", icon: FileText },
    { title: "Configuring fee structures", icon: FileText },
    { title: "Generating reports and analytics", icon: FileText },
    { title: "Mobile app setup and usage", icon: FileText },
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password. If you don't receive the email, check your spam folder or contact support.",
    },
    {
      question: "Can I import data from my existing system?",
      answer: "Yes! Apex Campus supports data import from most common formats including Excel, CSV, and direct database migration. Our implementation team can assist with complex migrations.",
    },
    {
      question: "How many users can I add to my account?",
      answer: "The number of users depends on your subscription plan. Basic plans include up to 50 users, while Enterprise plans offer unlimited users. Check your plan details in Settings.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, regular security audits, and are ISO 27001 certified. Your data is stored in secure, redundant data centers with 99.9% uptime.",
    },
    {
      question: "How do I upgrade my subscription?",
      answer: "Go to Settings > Billing > Upgrade Plan. You can compare plans and upgrade instantly. Changes take effect immediately, and you'll be prorated for the billing period.",
    },
  ];

  const resources = [
    { title: "Documentation", description: "Comprehensive guides and API docs", icon: BookOpen },
    { title: "Video Tutorials", description: "Step-by-step video walkthroughs", icon: Video },
    { title: "Community Forum", description: "Connect with other users", icon: Users },
    { title: "Release Notes", description: "Latest updates and features", icon: FileText },
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
                How Can We Help?
              </h1>
              <p className="mt-4 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms]">
                Find answers, get support, and make the most of Apex Campus.
              </p>
              {/* Search Bar */}
              <div className="mx-auto mt-8 max-w-xl animate-fade-up [animation-delay:200ms]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    className="w-full rounded-xl border-0 bg-background py-4 pl-12 pr-4 text-foreground shadow-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Contact Support
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {supportChannels.map((channel, index) => (
                <div
                  key={channel.title}
                  className="animate-fade-up rounded-xl border border-border bg-card p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <channel.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{channel.title}</h3>
                  <p className="mt-2 text-muted-foreground">{channel.description}</p>
                  <div className="mt-3 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {channel.availability}
                  </div>
                  <button className="mt-4 w-full">{channel.action}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Popular Topics</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popularTopics.map((topic, index) => (
                <div
                  key={topic.title}
                  className="animate-fade-up group flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="animate-fade-up rounded-xl border border-border bg-card p-6 shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{faq.question}</h3>
                        <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Self-Service Resources */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Self-Service Resources
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => (
                <div
                  key={resource.title}
                  className="animate-fade-up group cursor-pointer rounded-xl border border-border bg-card p-6 text-center shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                    <resource.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-2xl bg-hero-gradient p-8 text-center shadow-xl md:p-12">
              <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                Need Urgent Help?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                For critical issues affecting your institution's operations, our priority support team is available 24/7.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                  <Phone className="h-4 w-4" />
                  Emergency Hotline
                </button>
                <button size="lg" variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                  Submit Ticket
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

export default Support;
