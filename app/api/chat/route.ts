import { NextResponse } from "next/server";
import { PROJECTS, CAPABILITIES, MILESTONES, SERVICES } from "@/lib/data/portfolio";

export const runtime = "edge";

const generateSystemPrompt = () => {
  const projectsContext = PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\\n');
  const capabilitiesContext = CAPABILITIES.map(c => `- ${c.title} (${c.category})`).join('\\n');
  const servicesContext = SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\\n');
  const milestonesContext = MILESTONES.map(m => `- ${m.period}: ${m.role} - ${m.description}`).join('\\n');

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

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NVIDIA_NIM_API_KEY}`
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
      const errorText = await response.text();
      return NextResponse.json({ error: "NVIDIA API Error", details: errorText }, { status: response.status });
    }

    // Return the response body directly to stream the SSE chunks back to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
