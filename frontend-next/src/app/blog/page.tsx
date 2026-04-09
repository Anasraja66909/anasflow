import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog – AnasFlow Agency Command Center",
  description:
    "Insights, guides, and best practices for AI agencies managing automation costs and client ROI.",
};

const posts = [
  {
    title: "How to Reduce Your Claude API Costs by 40% Without Losing Quality",
    excerpt:
      "Most agencies overspend on AI APIs because they're using the wrong model for the job. Here's a practical guide to smart model routing.",
    tag: "Cost Optimization",
    date: "Apr 1, 2026",
    readTime: "6 min read",
    slug: "#",
    featured: true,
  },
  {
    title:
      "The Agency ROI Report: Why Clients Stay 3x Longer When You Show Proof",
    excerpt:
      "Data from 50+ agencies shows a direct correlation between sending monthly ROI reports and client retention. Here's what to include.",
    tag: "Client Retention",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    slug: "#",
  },
  {
    title:
      "n8n vs Zapier vs Make: Which Automation Platform is Cheapest at Scale?",
    excerpt:
      "We analyzed 6 months of automation spend data to find out which platform is the most cost-effective for agencies.",
    tag: "Automation",
    date: "Mar 20, 2026",
    readTime: "8 min read",
    slug: "#",
  },
  {
    title: "Setting Up Your First AI Spend Dashboard in Under 5 Minutes",
    excerpt:
      "A step-by-step walkthrough of connecting your OpenAI, n8n, and GoHighLevel accounts to AnasFlow for instant cost visibility.",
    tag: "Tutorial",
    date: "Mar 10, 2026",
    readTime: "4 min read",
    slug: "#",
  },
  {
    title: "How Top Agencies Price AI Automation Services for Maximum Profit",
    excerpt:
      "Pricing automation services is part art, part science. We break down the frameworks used by the most profitable AI agencies.",
    tag: "Business",
    date: "Feb 28, 2026",
    readTime: "7 min read",
    slug: "#",
  },
];

const tagColors: Record<string, string> = {
  "Cost Optimization": "text-[#00E5C0] bg-[#00E5C0]/10 border-[#00E5C0]/20",
  "Client Retention": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Automation: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Tutorial: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Business: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-black text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs">
              Blog
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-5">
            Insights for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] to-teal-300">
              AI Agency Owners
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto">
            Practical guides on cutting AI costs, retaining clients, and scaling
            your automation agency profitably.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <a href={featured.slug} className="block group">
          <div className="relative rounded-3xl border border-[#00E5C0]/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12 overflow-hidden hover:border-[#00E5C0]/40 hover:shadow-[0_0_60px_rgba(0,229,192,0.06)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#00E5C0]/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="px-3 py-1 rounded-full text-xs font-bold border bg-[#00E5C0]/10 text-[#00E5C0] border-[#00E5C0]/20">
                  Featured
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${tagColors[featured.tag]}`}
                >
                  {featured.tag}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 group-hover:text-[#00E5C0] transition-colors duration-300 max-w-3xl leading-tight">
                {featured.title}
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mb-6 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-5 text-zinc-600 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
                <span>{featured.date}</span>
                <span className="flex items-center gap-1.5 text-[#00E5C0] group-hover:gap-2.5 transition-all font-semibold">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Rest of Posts */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-5">
          {rest.map((post, i) => (
            <a
              key={i}
              href={post.slug}
              className="group block rounded-2xl border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${tagColors[post.tag] || "text-zinc-400 bg-white/5 border-white/10"}`}
                >
                  {post.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#00E5C0] transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-zinc-600 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-zinc-600 text-sm">
            More articles coming soon.{" "}
            <a
              href="mailto:hello@anasflow.io"
              className="text-[#00E5C0] hover:underline"
            >
              Subscribe to updates.
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050505] border-t border-white/5 text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4">
          Ready to take action?
        </h2>
        <p className="text-zinc-500 mb-8">
          Start your 30-day free trial. No credit card required.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
        >
          Get Started Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
