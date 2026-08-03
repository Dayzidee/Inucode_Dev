import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Kota Dev",
  description:
    "The terms and conditions governing your use of the Kota Dev portfolio, AI chat assistant, and consultation services.",
};

const LAST_UPDATED = "August 3, 2025";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      {
        sub: "Agreement",
        body: "By accessing or using the Kota Dev website (\"the Site\") and any services offered through it — including the AI chat assistant and consultation booking — you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.",
      },
      {
        sub: "Modifications",
        body: "Kota Dev reserves the right to update these Terms at any time. Changes will be indicated by the \"Last Updated\" date at the top of this page. Continued use of the Site following any changes constitutes your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    content: [
      {
        sub: "Portfolio & Information",
        body: "The Site presents Kota Dev's portfolio, capabilities, and professional background for informational purposes. Content is provided in good faith but does not constitute a warranty of any specific outcome for your project.",
      },
      {
        sub: "AI Chat Assistant",
        body: "The AI chat assistant is an automated tool designed to answer general questions about Kota Dev's services and capabilities. Responses are AI-generated and may occasionally be inaccurate, incomplete, or outdated. They do not constitute professional advice of any kind. For formal enquiries, always use the Contact form or schedule a consultation.",
      },
      {
        sub: "Consultation & Project Engagements",
        body: "Formal project engagements are governed by a separate Statement of Work (SOW) or contract agreed upon between the parties. Nothing on this Site creates a binding contract for services without a duly executed agreement.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      {
        sub: "Site Content",
        body: "All content on this Site — including text, design, code samples, graphics, and the overall aesthetic — is the intellectual property of Kota Dev unless otherwise stated. You may not reproduce, distribute, or create derivative works from Site content without prior written permission.",
      },
      {
        sub: "Client Work",
        body: "Portfolio items displayed on this Site are shown with the understanding that Kota Dev has the right to present them as examples of work. Intellectual property in delivered client projects is governed by the terms of the applicable client agreement.",
      },
      {
        sub: "Open Source",
        body: "Where components or code are released under an open-source licence, those licences govern your use of that specific material. The open-source licence does not extend to the overall Site design or branding.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: [
      {
        sub: "Permitted Use",
        body: "You may use the Site to learn about Kota Dev's services, make contact enquiries, and engage the AI assistant for informational purposes. You agree to use the Site in a lawful manner and in accordance with these Terms.",
      },
      {
        sub: "Prohibited Activities",
        body: "You must not: attempt to probe, scan, or test the vulnerability of the Site or its supporting infrastructure; introduce malicious code or attempt denial-of-service attacks; scrape content at scale using automated tools; impersonate any person or entity; or use the AI chat for generating harmful, illegal, or misleading content.",
      },
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers & Limitation of Liability",
    content: [
      {
        sub: "\"As Is\" Basis",
        body: "The Site and all content are provided on an \"as is\" and \"as available\" basis without warranty of any kind, express or implied. Kota Dev does not warrant that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.",
      },
      {
        sub: "Limitation of Liability",
        body: "To the fullest extent permitted by applicable law, Kota Dev shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of — or inability to use — the Site, the AI chat assistant, or any services described herein. Our total liability to you for any claim arising from use of the Site shall not exceed the amount you have paid Kota Dev in the 12 months preceding the claim, if any.",
      },
      {
        sub: "Third-Party Links",
        body: "The Site may contain links to third-party websites. Kota Dev is not responsible for the content, privacy practices, or availability of those sites. Linking to a third-party site does not constitute an endorsement.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: [
      {
        sub: "Jurisdiction",
        body: "These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to conflict of law principles. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos, Nigeria, unless an alternative dispute resolution mechanism is agreed upon in writing.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      {
        sub: "Questions About These Terms",
        body: "If you have any questions, concerns, or requests relating to these Terms of Service, please use the Contact page to get in touch. We aim to respond to all legal enquiries within 5 business days.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-white/10 max-w-7xl mx-auto">
        <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-6">
          Legal / Terms
        </p>
        <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-8">
          TERMS OF<br />
          <span className="text-neutral-600">SERVICE.</span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Please read these terms carefully before using the Kota Dev site or services. By using the Site you agree to be bound by these terms.
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
                href="/privacy"
                className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                Privacy Policy →
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
