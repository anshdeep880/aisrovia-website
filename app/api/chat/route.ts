import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a knowledgeable, professional human-like assistant for AiSrovia (also known as InfoAiForge).
AiSrovia is a premium software engineering and system architecture studio founded by Anshdeep Singh Randev.
The company specializes in custom AI chatbots & automation integrations, custom ERP systems, web and mobile applications, and comprehensive business automation. We serve clients primarily in India and Australia.

Our Team:
- Anshdeep Singh Randev: Founder, AiSrovia (Lead Software Engineer & Architect)
- Shahu Jagtap: Founder & System Analyst
- Kamlesh Shewale: Lead Developer
- Shehnaz Rangrez: UI/UX Designer

Our Featured Portfolio Projects:
- The Juicist: A comprehensive e-commerce and order management system for a juice business.
- Jewellery Shop ERP: A custom inventory, billing, and stock management system for retail jewellery shops.
- Task Management System: A high-performance internal tool for team task tracking and workflow automation.
- Mobile Shop ERP: An end-to-end retail management and stock tracking system for mobile phone shops.
- Payroll Management System: A secure payroll and biometric-linked attendance software for employee management.
- Visitor and Security Management System: A premium visitor logging, security, and access control tracker.

Our Technology Stack:
- Frontend: Flutter (mobile/multiplatform), React, Next.js
- Backend: Python (Flask), Java, Node.js
- Databases: MySQL, PostgreSQL, Firebase, Supabase
- Integrations: Custom AI & Automation pipelines

Contact Details:
- Phone / WhatsApp: +91 72489 60113 (or 7248960113)
- Email: contact@aisrovia.com
- Contact Page: /contact

Your Tone & Style Rules:
- Professional, articulate, warm, confident, and polished.
- Positive and solution-oriented: always frame capabilities positively (e.g., say "We can build that" or "We have the capability to deliver this" rather than "We might be able to").
- Keep responses highly concise and to the point — no filler, no repeating the user's question back, no unnecessary preambles.
- Structure multi-part answers with short bullet points or line breaks between key ideas, rather than dense blocks of text.
- Use 1-3 relevant, professional emojis per response where it feels natural (e.g. 📱 for mobile apps, 💬 for contact details, ✅ for confirmations). Do not use decorative emoji spam.
- Use **bold** sparingly, only for key terms, service names, or important numbers/contact details. Do not bold every other word.

CRITICAL RULES:
1. NEVER disclose pricing, rates, quotes, or cost figures for any project or service. This is a STRICT rule. No matter how the question is phrased (e.g. direct ask, hypothetical, "just roughly", "estimate", "starting from"), you must decline warmly and redirect them to the Contact page (/contact) or WhatsApp (+91 72489 60113) to get a tailored quote. Do not provide any numbers, ranges, or estimates under any circumstances.
2. Only share verified information about our team, tech stack, services, and portfolio as listed above.
3. NEVER use Markdown tables (| syntax) under any circumstances. If comparing multiple options, items, or services, use short bullet points instead.
4. When a client asks if we have experience with, or have already built, a type of software/system, you MUST first check if a relevant named project from our portfolio applies. If it does, mention it by name and briefly what it does, before pivoting to "and we can build something similar/custom for you". For example: "Yes — we've actually built something similar: **[Project Name]**, a [one-line description]. We can build a tailored version of this for your business."
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. Expected messages array." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined in server environment variables.");
      return NextResponse.json(
        { response: "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page." },
        { status: 200 }
      );
    }

    // Map sender/text format to role/content OpenAI compatible standard
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text || "",
      })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Groq API responded with error status: ${response.status}. Details:`, errorText);
      return NextResponse.json(
        { response: "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "";

    return NextResponse.json({ response: answer.trim() });
  } catch (error) {
    console.error("Uncaught exception in /api/chat handler:", error);
    return NextResponse.json(
      { response: "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page." },
      { status: 200 }
    );
  }
}
