import Header from "../Navbar_landing";
import Footer from "../Footer";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Future of Campus Management: AI and Automation in Education",
    excerpt: "Discover how artificial intelligence and automation are revolutionizing the way educational institutions manage their operations, from admissions to alumni engagement.",
    author: "Priya Sharma",
    date: "December 1, 2025",
    readTime: "8 min read",
    category: "Technology",
    image: "bg-hero-gradient",
  };

  const posts = [
    {
      title: "5 Ways to Improve Student Engagement with Technology",
      excerpt: "Learn practical strategies for using technology to boost student participation and outcomes.",
      author: "Amit Patel",
      date: "November 28, 2025",
      readTime: "5 min read",
      category: "Best Practices",
    },
    {
      title: "Data Privacy in Education: A Complete Guide for 2025",
      excerpt: "Understanding compliance requirements and best practices for protecting student data.",
      author: "Sneha Reddy",
      date: "November 25, 2025",
      readTime: "10 min read",
      category: "Compliance",
    },
    {
      title: "How XYZ University Reduced Admin Work by 60%",
      excerpt: "A case study on digital transformation in higher education administration.",
      author: "Rajesh Kumar",
      date: "November 22, 2025",
      readTime: "6 min read",
      category: "Case Study",
    },
    {
      title: "The Rise of Hybrid Learning: Preparing Your Campus",
      excerpt: "Infrastructure and process changes needed to support flexible learning models.",
      author: "Priya Sharma",
      date: "November 18, 2025",
      readTime: "7 min read",
      category: "Trends",
    },
    {
      title: "Streamlining Fee Collection: Digital Payment Solutions",
      excerpt: "Modern approaches to managing institutional finances and student payments.",
      author: "Amit Patel",
      date: "November 15, 2025",
      readTime: "4 min read",
      category: "Finance",
    },
    {
      title: "Building a Data-Driven Culture in Educational Institutions",
      excerpt: "How to leverage analytics for better decision-making across your campus.",
      author: "Sneha Reddy",
      date: "November 12, 2025",
      readTime: "8 min read",
      category: "Analytics",
    },
  ];

  const categories = ["All", "Technology", "Best Practices", "Case Study", "Trends", "Compliance", "Analytics"];

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
                Apex Campus Blog
              </h1>
              <p className="mt-4 animate-fade-up text-lg text-primary-foreground/80 [animation-delay:100ms]">
                Insights, trends, and best practices for modern education management.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className={`aspect-video md:aspect-auto ${featuredPost.image} flex items-center justify-center`}>
                  <span className="text-6xl font-bold text-primary-foreground/20">Featured</span>
                </div>
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">Featured Post</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">{featuredPost.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <button className="mt-6 gap-2">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border pb-8">
          <div className="container">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <article
                  key={post.title}
                  className="animate-fade-up group cursor-pointer rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-muted flex items-center justify-center rounded-t-xl">
                    <Tag className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-6">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button variant="outline" size="lg" className="gap-2">
                Load More Articles
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Stay Updated</h2>
              <p className="mt-4 text-muted-foreground">
                Subscribe to our newsletter for the latest insights on education technology and management.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
                />
                <button size="lg">Subscribe</button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
