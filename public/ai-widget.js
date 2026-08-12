(function () {
  // 1. Inject Styles dynamically into the head
  const style = document.createElement("style");
  style.textContent = `
    .ai-widget-container {
      position: fixed;
      bottom: 24px;
      left: 16px;
      right: 16px;
      width: auto;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Manrope', sans-serif;
      pointer-events: none;
    }
    @media (min-width: 640px) {
      .ai-widget-container {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: 480px;
      }
    }
    .ai-widget-pill {
      width: 100%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(237,234,228,0.20));
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.45);
      box-shadow: 0 12px 36px rgba(0,170,255,0.14);
      border-radius: 9999px;
      padding: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      overflow: hidden;
      cursor: text;
      transition: all 0.3s ease;
      pointer-events: auto;
    }
    .ai-widget-pill::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent, transparent);
      pointer-events: none;
    }
    .ai-widget-pill:hover {
      background: linear-gradient(to bottom, rgba(255,255,255,0.40), rgba(237,234,228,0.25));
      box-shadow: 0 12px 44px rgba(0,170,255,0.22);
    }
    .ai-widget-input {
      flex-grow: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      color: #0a1628;
      font-family: 'Manrope', sans-serif;
      padding: 8px 4px;
    }
    .ai-widget-input::placeholder {
      color: rgba(10,22,40,0.6);
    }
    .ai-widget-send {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #00aaff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(0,170,255,0.35);
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .ai-widget-send:hover {
      background: #0099ee;
    }
    .ai-widget-send:active {
      transform: scale(0.95);
    }
    .ai-widget-send:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
    .ai-widget-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #0a1628;
      border: 1px solid rgba(237,234,228,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
    }
    .ai-widget-avatar svg {
      width: 28px;
      height: 28px;
      color: #edeae4;
    }
    .ai-widget-panel {
      width: 100%;
      height: 380px;
      border-radius: 24px;
      background: linear-gradient(to bottom, rgba(10, 22, 40, 0.85), rgba(10, 22, 40, 0.75));
      border: 1px solid rgba(237, 234, 228, 0.20);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 20px 50px rgba(0,170,255,0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 16px;
      opacity: 0;
      transform: translateY(15px) scale(0.97);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .ai-widget-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
      pointer-events: none;
      border-radius: 24px 24px 0 0;
    }
    .ai-widget-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .ai-widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      background: rgba(255, 255, 255, 0.05);
    }
    .ai-widget-header-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ai-widget-header-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(0,170,255,0.15);
      border: 1px solid rgba(0,170,255,0.40);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00aaff;
    }
    .ai-widget-header-text {
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #edeae4;
    }
    .ai-widget-close {
      color: rgba(237,234,228,0.5);
      background: transparent;
      border: none;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .ai-widget-close:hover {
      color: #00aaff;
      background: rgba(255,255,255,0.05);
    }
    .ai-widget-messages {
      flex-grow: 1;
      overflow-y: auto;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: transparent;
    }
    .ai-widget-msg {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .ai-widget-msg.user {
      align-items: flex-end;
    }
    .ai-widget-msg.ai {
      align-items: flex-start;
    }
    .ai-widget-bubble {
      padding: 10px 18px;
      border-radius: 16px;
      max-width: 85%;
      line-height: 1.5;
      font-size: 14px;
      text-align: left;
    }
    .ai-widget-msg.user .ai-widget-bubble {
      background: #00aaff;
      color: #0a1628;
      border-top-right-radius: 0;
      font-weight: 500;
    }
    .ai-widget-msg.ai .ai-widget-bubble {
      background: rgba(237,234,228,0.1);
      color: #edeae4;
      border: 1px solid rgba(237,234,228,0.1);
      border-top-left-radius: 0;
    }
    .ai-widget-loading {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(237,234,228,0.1);
      border: 1px solid rgba(237,234,228,0.1);
      border-radius: 16px;
      border-top-left-radius: 0;
      padding: 12px 16px;
      max-width: 50px;
    }
    .ai-widget-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #edeae4;
      animation: ai-bounce 1.4s infinite ease-in-out both;
    }
    .ai-widget-dot:nth-child(1) { animation-delay: -0.32s; }
    .ai-widget-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes ai-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
  `;
  document.head.appendChild(style);

  // 1.5 Build Backdrop Node
  const backdrop = document.createElement("div");
  backdrop.className = "ai-widget-backdrop";
  document.body.appendChild(backdrop);

  // 2. Build HTML Structure
  const container = document.createElement("div");
  container.className = "ai-widget-container";
  container.innerHTML = `
    <div class="ai-widget-panel" id="aiPanel">
      <div class="ai-widget-header">
        <div class="ai-widget-header-title">
          <div class="ai-widget-header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          </div>
          <span class="ai-widget-header-text">AiSROvia Assistant</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="ai-widget-close" id="aiResetBtn" title="Reset conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button class="ai-widget-close" id="aiCloseBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div class="ai-widget-messages" id="aiMessages">
        <div class="ai-widget-msg ai">
          <div class="ai-widget-bubble">
            Hello! 👋 I am the AiSROvia assistant. Ask me about our services, our team, or how to get in touch with us!
          </div>
        </div>
      </div>
    </div>
    <div class="ai-widget-pill" id="aiPill">
      <div class="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none"></div>
      <div class="ai-widget-avatar" id="aiAvatar">
        <img src="/assets/Logo/chatbot.png" alt="AI Assistant Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
      </div>
      <input type="text" class="ai-widget-input" id="aiInput" placeholder="Ask AI anything..." />
      <button class="ai-widget-send" id="aiSendBtn" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(container);

  // 3. Logic & Handlers
  const panel = document.getElementById("aiPanel");
  const pill = document.getElementById("aiPill");
  const avatar = document.getElementById("aiAvatar");
  const input = document.getElementById("aiInput");
  const sendBtn = document.getElementById("aiSendBtn");
  const messagesBox = document.getElementById("aiMessages");
  const closeBtn = document.getElementById("aiCloseBtn");

  const resetBtn = document.getElementById("aiResetBtn");

  const INITIAL_MESSAGE = {
    sender: "ai",
    text: "Hello! 👋 I am the AiSROvia assistant. Ask me about our services, our team, or how to get in touch with us!"
  };

  let chatHistory = [INITIAL_MESSAGE];
  let isRequestPending = false;

  function loadHistory() {
    try {
      const saved = sessionStorage.getItem("aisrovia_chat_history");
      if (saved) {
        chatHistory = JSON.parse(saved);
        // Clear default messages and render loaded history
        messagesBox.innerHTML = "";
        chatHistory.forEach(msg => {
          addBubble(msg.sender, msg.text, false);
        });
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }

  function saveHistory() {
    try {
      sessionStorage.setItem("aisrovia_chat_history", JSON.stringify(chatHistory));
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  }

  // Load history on startup
  loadHistory();

  function togglePanel(forceOpen) {
    const isOpen = typeof forceOpen === "boolean" ? forceOpen : !panel.classList.contains("open");
    if (isOpen) {
      panel.classList.add("open");
      backdrop.classList.add("open");
      input.focus();
      messagesBox.scrollTop = messagesBox.scrollHeight;
    } else {
      panel.classList.remove("open");
      backdrop.classList.remove("open");
    }
  }

  avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel();
  });

  pill.addEventListener("click", () => {
    input.focus();
  });

  backdrop.addEventListener("click", () => {
    togglePanel(false);
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel(false);
  });

  resetBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    try {
      sessionStorage.removeItem("aisrovia_chat_history");
    } catch (e) {}
    chatHistory = [INITIAL_MESSAGE];
    messagesBox.innerHTML = `
      <div class="ai-widget-msg ai">
        <div class="ai-widget-bubble">
          Hello! 👋 I am the AiSROvia assistant. Ask me about our services, our team, or how to get in touch with us!
        </div>
      </div>
    `;
    input.value = "";
    sendBtn.disabled = true;
    input.disabled = false;
    isRequestPending = false;
    input.focus();
  });

  input.addEventListener("input", () => {
    sendBtn.disabled = !input.value.trim() || isRequestPending;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isRequestPending) {
      sendMessage();
    }
  });

  sendBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isRequestPending) {
      sendMessage();
    }
  });

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isRequestPending) return;

    isRequestPending = true;
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;

    // Add User bubble
    chatHistory.push({ sender: "user", text });
    saveHistory();
    addBubble("user", text);
    togglePanel(true);

    // Add Loading bubble
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "ai-widget-loading";
    loadingDiv.innerHTML = `
      <span class="ai-widget-dot"></span>
      <span class="ai-widget-dot"></span>
      <span class="ai-widget-dot"></span>
    `;
    messagesBox.appendChild(loadingDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Resolve Response via API
    let responseText = "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.";
    try {
      responseText = await getAIResponse(chatHistory);
    } catch (err) {
      console.error("Failed to query static AI response:", err);
    }

    // Remove loading
    loadingDiv.remove();
    input.disabled = false;
    isRequestPending = false;
    sendBtn.disabled = !input.value.trim();

    // Add streaming bubble
    chatHistory.push({ sender: "ai", text: responseText });
    saveHistory();
    addBubble("ai", responseText, true);
    input.focus();
  }

  // Helper to strip any markdown table-like syntax or lines starting with |
  function stripTables(text) {
    return text
      .split("\n")
      .filter(line => !line.trim().startsWith("|") && !line.trim().match(/^[:\-|\s]+$/))
      .join("\n");
  }

  // Helper to format basic Markdown features (bolding, lists, linebreaks)
  function formatMarkdown(text) {
    let cleanText = stripTables(text);
    // Replace bold **text** with styled strong tag
    cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 800; color: #00aaff;">$1</strong>');
    
    // Replace bullet points starting with - or * with bulleted list elements
    let lines = cleanText.split("\n");
    let inList = false;
    let result = [];
    
    lines.forEach(line => {
      let trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          result.push('<ul style="margin: 6px 0; padding-left: 20px; list-style-type: disc; text-align: left;">');
          inList = true;
        }
        result.push(`<li style="text-align: left; margin-bottom: 4px;">${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(line);
      }
    });
    if (inList) {
      result.push("</ul>");
    }
    return result.join("\n").replace(/\n/g, "<br>");
  }

  function addBubble(sender, text, animate = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-widget-msg ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "ai-widget-bubble";
    msgDiv.appendChild(bubble);
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    if (animate) {
      const cleanText = sender === "ai" ? stripTables(text) : text;
      const words = cleanText.split(" ");
      let index = 0;
      bubble.innerHTML = "";
      const timer = setInterval(() => {
        index++;
        const currentText = words.slice(0, index).join(" ");
        if (sender === "ai") {
          bubble.innerHTML = formatMarkdown(currentText);
        } else {
          bubble.textContent = currentText;
        }
        messagesBox.scrollTop = messagesBox.scrollHeight;
        if (index >= words.length) {
          clearInterval(timer);
        }
      }, 35); // 35ms stagger per word
    } else {
      if (sender === "ai") {
        bubble.innerHTML = formatMarkdown(text);
      } else {
        bubble.textContent = text;
      }
    }
  }

  // Real API response resolver calling Next.js route
  async function getAIResponse(history) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact chat api");
      }

      const data = await response.json();
      return data.response || "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.";
    } catch (e) {
      console.error(e);
      return "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.";
    }
  }
})();
