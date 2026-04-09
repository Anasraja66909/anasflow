import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy – AnasFlow",
  description:
    "AnasFlow Privacy Policy. Learn how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide when creating an account (name, email, password), information from third-party API connections you authorize (read-only API keys, usage data from platforms like OpenAI, Anthropic, n8n, Zapier, and GoHighLevel), and technical information such as IP addresses, browser type, and device identifiers for security and fraud prevention purposes.

We do NOT collect your clients' personal data. All client-related data within AnasFlow is data you input yourself.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use collected information to:
• Provide and improve the AnasFlow platform and its features
• Generate usage analytics, cost breakdowns, and ROI reports on your behalf
• Send transactional emails (account confirmation, billing receipts, alerts)
• Provide customer support and respond to inquiries
• Detect and prevent fraud or unauthorized access
• Comply with legal obligations

We do not sell your personal information to third parties. Ever.`,
  },
  {
    title: "3. API Keys & Third-Party Data",
    content: `When you connect external platforms (OpenAI, n8n, Zapier, GoHighLevel, etc.), you provide read-only API keys. These keys are stored with AES-256 encryption at rest and are only used to fetch usage and cost data from those platforms. We never use your API keys to modify, create, or delete any resources in your third-party accounts.`,
  },
  {
    title: "4. Data Sharing",
    content: `We may share your data with:
• Service providers who help us operate our platform (hosting, payment processors, email delivery)
• Legal authorities if required by law or court order
• Acquirers in the event of a merger or acquisition, in which case you will be notified in advance

We do not share your data with advertisers or data brokers.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your account data for as long as your account is active. If you delete your account, we will permanently delete your data within 30 days, except where we are required to retain it for legal or compliance purposes (e.g., billing records for 7 years as required by tax law).`,
  },
  {
    title: "6. Security",
    content: `We take security seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and follow OWASP best practices. However, no system is 100% secure. We encourage you to use a strong, unique password and to enable two-factor authentication when available.`,
  },
  {
    title: "7. Your Rights (GDPR & CCPA)",
    content: `Depending on your location, you may have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data ("right to be forgotten")
• Object to or restrict certain processing
• Port your data to another service
• Withdraw consent at any time

To exercise any of these rights, contact us at hello@anasflow.io. We will respond within 30 days.`,
  },
  {
    title: "8. Cookies",
    content: `We use cookies and similar technologies to keep you logged in, remember your preferences, and analyze platform usage (via privacy-respecting analytics). You can control cookies through your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice in the dashboard. Your continued use of AnasFlow after changes take effect constitutes your acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at:

AnasFlow
Email: hello@anasflow.io

We are committed to addressing your concerns promptly and transparently.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-12 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-white/3 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs">
              Legal
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm">Last updated: April 3, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 mb-8 text-sm text-zinc-400 leading-relaxed">
          At AnasFlow, your privacy is a core part of our product — not an
          afterthought. This policy explains clearly and honestly how we handle
          your data. If something is unclear, please reach out to us at{" "}
          <a
            href="mailto:hello@anasflow.io"
            className="text-[#00E5C0] hover:underline"
          >
            hello@anasflow.io
          </a>
          .
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-white mb-3">{s.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#050505] border-t border-white/5 text-center px-6">
        <p className="text-zinc-500 text-sm mb-5">
          Questions about your data? We're happy to help.
        </p>
        <a
          href="mailto:hello@anasflow.io"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  );
}
