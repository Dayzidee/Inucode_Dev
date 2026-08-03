import { NextResponse } from "next/server";
import { PROJECTS, CAPABILITIES, MILESTONES, SERVICES } from "../../../lib/data/portfolio";

export const runtime = "edge";

const generateSystemPrompt = () => {
  const projectsContext = PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n');
  const capabilitiesContext = CAPABILITIES.map(c => `- ${c.title} (${c.category})`).join('\n');
  const servicesContext = SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n');
  const milestonesContext = MILESTONES.map(m => `- ${m.period}: ${m.role} - ${m.description}`).join('\n');

  return `
You are the Kota Dev AI Assistant, a highly efficient, sophisticated AI embedded within Dunsimi Sanni's portfolio.
Your job is to answer questions about Dunsimi's work, tech stack, personality, and background. 
Keep responses concise, extremely fast, and maintain a professional, slightly edgy "cyber-industrial" tone.
Avoid long essays. Use bullet points when necessary. If asked about a project, highlight the problem and the architecture used.

### Personality & Background:
- Name: Dunsimi Sanni
- Identity: 10x Full-Stack Engineer & AI Researcher based in Nigeria.
- Philosophy: "Industrial grade engineering meets editorial design." You bridge the gap between scalable backend architecture and AI-powered systems.
- Tone: Confident, direct, highly technical, but accessible.

### Core Capabilities:
${capabilitiesContext}

### Services:
${servicesContext}

### Key Projects:
${projectsContext}

### Milestones & History:
${milestonesContext}
`;
};

function getSmartFallbackResponse(userPrompt: string): string {
  const lower = userPrompt.toLowerCase();

  if (lower.includes("who") || lower.includes("about") || lower.includes("dunsimi") || lower.includes("kota")) {
    return "Dunsimi Sanni (Kota Dev) is a Full-Stack Engineer & AI Researcher based in Nigeria. He specializes in building industrial-grade web architecture, financial logic systems, and AI agent frameworks.";
  }
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio") || lower.includes("studio")) {
    return "Dunsimi's featured projects include KOTA SKILLZ (AI architectural standard library), Indigent Scholars (philanthropic EdTech), Despendable (fintech expense management), and DevBot Dialogue (AI developer assistant). You can view the full deep-dives on the Studio page!";
  }
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("python") || lower.includes("react")) {
    return "Core Tech Stack:\n- Languages: TypeScript, Python, SQL\n- Frontend: React, Next.js, Tailwind CSS, GSAP, Three.js\n- Backend: Node.js, Express, FastAPI, MongoDB, PostgreSQL, Docker\n- AI: AGY Agent SDK, Custom LLM Workflows, Prompt Engineering";
  }
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("whatsapp") || lower.includes("reach")) {
    return "You can reach Dunsimi directly via Email at inuoluwadunsimis@gmail.com or WhatsApp at +234 901 403 0047. Or click 'START A PROJECT' on the homepage to open the consultation engine!";
  }

  return "Kota Dev System Online. I can assist with portfolio navigation, technical documentation, or project deep-dives. Feel free to ask about Dunsimi's tech stack, featured projects, or consultation availability.";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.NVIDIA_NIM_API_KEY;

    if (!apiKey) {
      const fallbackText = getSmartFallbackResponse(lastUserMessage);
      return new Response(`data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
        }
      });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: generateSystemPrompt() },
          ...messages
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 512,
        stream: true
      })
    });

    if (!response.ok) {
      console.warn("NVIDIA API returned status:", response.status);
      const fallbackText = getSmartFallbackResponse(lastUserMessage);
      return new Response(`data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
        }
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    const fallbackText = "Kota Dev System Online. I can assist with portfolio navigation, technical documentation, or project deep-dives. Feel free to ask about Dunsimi's tech stack, featured projects, or consultation availability.";
    return new Response(`data: ${JSON.stringify({ choices: [{ delta: { content: fallbackText } }] })}\n\ndata: [DONE]\n\n`, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      }
    });
  }
}
