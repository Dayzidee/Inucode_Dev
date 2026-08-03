import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kota Dev",
  description:
    "How Kota Dev collects, uses, and protects your personal information when you use our portfolio and consultation services.",
};

const LAST_UPDATED = "August 3, 2025";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      {
        sub: "Information You Provide Directly",
        body: "When you use our contact form, book a consultation, or send us a message, we collect your name, email address, project details, and any other information you choose to share. This data is used solely to respond to your inquiry and deliver our services.",
      },
      {
        sub: "Automatically Collected Information",
        body: "When you visit our site, we may automatically collect certain technical data including your IP address, browser type and version, operating system, referring URLs, and pages visited. This is collected via standard web analytics tools to help us understand how our site is used and to improve performance.",
      },
      {
        sub: "Cookies & Local Storage",
        body: "We use minimal, essential cookies to ensure the site functions correctly. We do not use advertising cookies, cross-site tracking cookies, or sell your browsing data to third parties. You may disable cookies in your browser settings without affecting your ability to use the site.",
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    content: [
      {
        sub: "Service Delivery",
        body: "We use contact information to respond to inquiries, schedule consultations, provide project quotes, and deliver contracted services. We will never use your information for purposes unrelated to your request without explicit consent.",
      },
      {
        sub: "Site Improvement",
        body: "Anonymised analytics data helps us understand which pages are most useful, identify technical issues, and optimise the overall experience. No personally identifiable information is used in this analysis.",
      },
      {
        sub: "AI Chat Feature",
        body: "Our AI chat assistant processes your messages in real-time to generate relevant responses. Conversation data is not stored beyond your active session unless you explicitly submit a contact inquiry through the chat. Message content is processed by third-party AI provider APIs under their respective privacy agreements.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    content: [
      {
        sub: "We Do Not Sell Your Data",
        body: "Kota Dev does not sell, rent, or trade your personal information to any third party, ever.",
      },
      {
        sub: "Service Providers",
        body: "We work with a small number of trusted third-party services to operate this site — including hosting providers (Vercel), analytics platforms, and AI API providers (Google). These providers receive only the minimum data necessary to perform their functions and are contractually bound to protect your information.",
      },
      {
        sub: "Legal Compliance",
        body: "We may disclose information if required to do so by law, regulation, or valid legal process. We will attempt to notify you of any such requirement unless legally prohibited from doing so.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      {
        sub: "Retention Period",
        body: "Contact form submissions and consultation records are retained for a maximum of 24 months to facilitate ongoing project work and follow-up. After this period, records are permanently deleted unless an active contractual relationship requires longer retention.",
      },
      {
        sub: "Your Right to Deletion",
        body: "You may request deletion of any personal data we hold about you at any time. We will process your request within 30 days. To submit a deletion request, email us at the address listed in the Contact section below.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      {
        sub: "Access & Portability",
        body: "You have the right to request a copy of the personal data we hold about you, in a portable, machine-readable format.",
      },
      {
        sub: "Correction",
        body: "If any information we hold is inaccurate or incomplete, you have the right to request correction.",
      },
      {
        sub: "Objection & Restriction",
        body: "You may object to or request restriction of the processing of your personal data at any time. We will honour these requests unless we have a compelling legal reason not to.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    content: [
      {
        sub: "How We Protect Your Data",
        body: "We implement industry-standard security measures including HTTPS encryption, environment-level secrets management, and access controls. All data in transit is encrypted via TLS. We conduct periodic security reviews of our infrastructure and dependencies.",
      },
      {
        sub: "Breach Notification",
        body: "In the unlikely event of a data breach that may affect your personal information, we will notify affected individuals within 72 hours of becoming aware of the breach, in accordance with applicable regulations.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      {
        sub: "Questions & Requests",
        body: "If you have any questions about this Privacy Policy, wish to exercise your rights, or have a concern about how we handle your data, please reach out via the Contact page or send an email to the address listed in our footer. We aim to respond to all privacy-related enquiries within 5 business days.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-white/10 max-w-7xl mx-auto">
        <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-6">
          Legal / Privacy
        </p>
        <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-8">
          PRIVACY<br />
          <span className="text-neutral-600">POLICY.</span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Kota Dev is committed to protecting your privacy. This policy explains what data we collect, how we use it, and the choices you have regarding your information.
        </p>
        <p className="mt-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Sticky Table of Contents */}
          <nav className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-4">On this page</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-neutral-500 hover:text-white transition-colors py-1.5 border-l border-white/10 hover:border-white/40 pl-4 leading-tight tracking-wide"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-9 space-y-16 sm:space-y-20">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 rounded-2xl">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                        {item.sub}
                      </h3>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer nav */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
              <Link
                href="/terms"
                className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                Terms of Service →
              </Link>
              <Link
                href="/contact"
                className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
