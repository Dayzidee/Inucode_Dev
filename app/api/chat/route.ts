import { PROJECTS, CAPABILITIES, MILESTONES, SERVICES } from "../../../lib/data/portfolio";

export const runtime = "edge";

const generateSystemPrompt = () => {
  const projectsContext = PROJECTS.map(
    (p) => `- ${p.title} (${p.category}): ${p.description}`
  ).join("\n");
  const capabilitiesContext = CAPABILITIES.map(
    (c) => `- ${c.title} (${c.category}): ${c.description || ""}`
  ).join("\n");
  const servicesContext = SERVICES.map(
    (s) => `- ${s.title}: ${s.description}`
  ).join("\n");
  const milestonesContext = MILESTONES.map(
    (m) => `- ${m.period}: ${m.role} — ${m.description}`
  ).join("\n");

  return `You are the Kota Dev AI Assistant embedded within Dunsimi Sanni's portfolio website.
Your role: answer questions about Dunsimi's work, capabilities, projects, and services. 
Help potential clients understand what Kota Dev can build for them and guide them toward booking a consultation.

### Rules:
- Be concise, confident, and technically sharp. Max 3-4 short paragraphs or a brief bulleted list.
- Use a professional, slightly edgy "cyber-industrial" tone — not robotic, not overly casual.
- If someone says they need a website, app, or product — ask one clarifying question about their goals, then pitch the right service.
- If someone asks about availability or pricing, tell them to book a consultation via the Contact page.
- Do NOT say "I don't know" — pivot to the closest relevant capability.
- Do NOT make up projects or facts outside the data below.

### About Dunsimi Sanni (Kota Dev):
- Full-Stack Engineer & AI Researcher based in Lagos, Nigeria.
- Philosophy: "Industrial grade engineering meets editorial design."
- Specialises in: TypeScript, Python, React/Next.js, Node.js, MongoDB, PostgreSQL, Docker, LLM orchestration, AI agent frameworks.
- Available for: freelance contracts, product partnerships, technical consultation. Currently accepting Q3/Q4 engagements.
- Contact: inuoluwadunsimis@gmail.com | WhatsApp: +234 901 403 0047

### Core Capabilities:
${capabilitiesContext}

### Services Offered:
${servicesContext}

### Featured Projects:
${projectsContext}

### Career Milestones:
${milestonesContext}

### Quick answers:
- Pricing: Project-based, discussed in consultation. No fixed retainer listed publicly.
- Turnaround: Depends on scope. MVPs typically 2–6 weeks.
- Location: Lagos, Nigeria — but works globally and fully remote.
- Stack preference: TypeScript + Next.js for frontend; Node/Python for backend; PostgreSQL or MongoDB for data.
`;
};

/** Intelligent keyword-based fallback when AI API is unavailable */
function getSmartFallbackResponse(userPrompt: string): string {
  const lower = userPrompt.toLowerCase();

  if (lower.includes("website") || lower.includes("web app") || lower.includes("landing page")) {
    return "Great — Kota Dev builds high-performance web applications and editorial-grade landing pages.\n\nTo point you in the right direction: what's the core goal of the site? (e.g. showcase a brand, sell a product, run a platform, or book clients)\n\nOnce I know the scope, I can outline the right approach — or you can head straight to the Contact page to book a consultation.";
  }
  if (lower.includes("mobile") || lower.includes("app") || lower.includes("ios") || lower.includes("android")) {
    return "Kota Dev builds cross-platform mobile experiences using React Native and Progressive Web Apps (PWAs). If you need native iOS/Android performance with a shared codebase, that's the sweet spot.\n\nBook a consultation via the Contact page to discuss your app idea in detail.";
  }
  if (lower.includes("ai") || lower.includes("chatbot") || lower.includes("llm") || lower.includes("agent")) {
    return "AI integration is a core offering — from LLM-powered chatbots to autonomous agent workflows using the AGY SDK and custom prompt orchestration.\n\nProjects range from customer support bots to full AI researcher assistants. What's your use case?";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("how much") || lower.includes("charge")) {
    return "Pricing is project-based and scoped during consultation — no public rate card. Engagements typically start with a discovery call to understand your requirements, timeline, and budget.\n\nBook a session via the Contact page and we'll take it from there.";
  }
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("whatsapp") || lower.includes("reach") || lower.includes("available")) {
    return "You can reach Dunsimi directly:\n- Email: inuoluwadunsimis@gmail.com\n- WhatsApp: +234 901 403 0047\n\nOr click **Contact** in the navigation to open the consultation engine. Currently accepting Q3/Q4 2025 contracts.";
  }
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio") || lower.includes("studio")) {
    return "Featured projects include:\n- **KOTA SKILLZ** — AI architectural standard library\n- **Indigent Scholars** — philanthropic EdTech platform\n- **Despendable** — fintech expense management system\n- **DevBot Dialogue** — AI developer assistant\n\nHead to the Studio page for full technical deep-dives on each one.";
  }
  if (lower.includes("who") || lower.includes("about") || lower.includes("dunsimi") || lower.includes("kota")) {
    return "Dunsimi Sanni (Kota Dev) is a Full-Stack Engineer & AI Researcher based in Lagos, Nigeria. He bridges scalable backend architecture with AI-powered systems and editorial-grade frontend design.\n\nCore stack: TypeScript, Python, React/Next.js, Node.js, PostgreSQL, Docker, LLM orchestration.";
  }
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("python") || lower.includes("react") || lower.includes("typescript")) {
    return "Core tech stack:\n- **Languages:** TypeScript, Python, SQL\n- **Frontend:** React, Next.js, Tailwind CSS, GSAP\n- **Backend:** Node.js, Express, FastAPI, MongoDB, PostgreSQL, Docker\n- **AI/ML:** LLM orchestration, AGY Agent SDK, custom prompt pipelines\n- **Infra:** Vercel, Railway, Supabase, MongoDB Atlas";
  }

  return "Kota Dev System — ready to assist. You can ask about:\n- Projects & portfolio\n- Tech stack & capabilities\n- Services & pricing\n- How to get in touch\n\nWhat are you looking to build?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.NVIDIA_NIM_API_KEY;

    if (!apiKey) {
      console.warn("NVIDIA_NIM_API_KEY not set — using smart fallback");
      const fallbackText = getSmartFallbackResponse(lastUserMessage);
      return new Response(
        `data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`,
        { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } }
      );
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: generateSystemPrompt() },
          ...messages,
        ],
        temperature: 0.4,
        top_p: 0.7,
        max_tokens: 600,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("NVIDIA API error:", response.status, errText.slice(0, 200));
      const fallbackText = getSmartFallbackResponse(lastUserMessage);
      return new Response(
        `data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`,
        { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } }
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    const fallbackText = "Kota Dev system encountered an issue. Please try again or reach out directly via the Contact page.";
    return new Response(
      `data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } }
    );
  }
}
