"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIAssistant, ChatMessage } from "@/src/hooks/useAIAssistant";
import ReactMarkdown from "react-markdown";

// Helper to strip any markdown table-like syntax or lines starting with |
const stripTables = (text: string) => {
  return text
    .split("\n")
    .filter(line => !line.trim().startsWith("|") && !line.trim().match(/^[:\-|\s]+$/))
    .join("\n");
};

// Custom components renderer for ReactMarkdown to make it look premium inside chat bubbles
const markdownComponents = {
  strong: ({ children, ...props }: any) => (
    <strong className="font-extrabold text-[#00aaff]" {...props}>
      {children}
    </strong>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-5 my-1.5 space-y-1.5 text-left" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-[#edeae4]/90 text-left" {...props}>
      {children}
    </li>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-1.5 last:mb-0 text-left" {...props}>
      {children}
    </p>
  ),
};

// 1. Custom SVG components for Bot Avatar and Icons
const BotAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-[#0a1628] border border-[#edeae4]/20 flex items-center justify-center shadow-inner relative overflow-hidden flex-shrink-0">
    <img
      src="/assets/Logo/chatbot.png"
      alt="AI Assistant Logo"
      className="w-full h-full object-cover"
    />
  </div>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="1.1em"
    height="1.1em"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="1em"
    height="1em"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const RotateCcwIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="1em"
    height="1em"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    width="1.1em"
    height="1.1em"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

// Typewriter reveal component for streaming effect (word-by-word)
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const cleanText = stripTables(text);
    const words = cleanText.split(" ");
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      index++;
      setDisplayedText(words.slice(0, index).join(" "));
      if (index >= words.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 35); // 35ms stagger per word
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <ReactMarkdown components={markdownComponents}>{displayedText}</ReactMarkdown>;
};

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const INITIAL_MESSAGE: ChatMessage = {
    id: "welcome",
    sender: "ai",
    text: "Hello! 👋 I am the AiSROvia assistant. Ask me about our services, our team, or how to get in touch with us!",
  };
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const { getAIResponse, loading } = useAIAssistant();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("aisrovia_chat_history");
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse chat history:", e);
        }
      }
    }
  }, []);

  // Save to sessionStorage when messages update
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      sessionStorage.setItem("aisrovia_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Reset conversation handler
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("aisrovia_chat_history");
    }
    setMessages([INITIAL_MESSAGE]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom of chat area
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setIsOpen(true); // Always open response panel on send

    try {
      const answer = await getAIResponse(nextMessages);
      const aiMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: answer,
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="fixed bottom-6 left-4 right-4 w-auto sm:left-1/2 sm:right-auto sm:w-[480px] sm:-translate-x-1/2 z-[9999] flex flex-col items-center">

      {/* 1. UPWARD EXPANDED CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[380px] rounded-3xl bg-gradient-to-b from-[#0a1628]/85 to-[#0a1628]/75 border border-[#edeae4]/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,170,255,0.15)] flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Glossy top sheen overlay */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00aaff]/15 border border-[#00aaff]/40 flex items-center justify-center text-xs text-[#00aaff]">
                  <SparklesIcon className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-syne text-xs sm:text-sm font-bold text-[#edeae4]">
                    AiSROvia Assistant
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[#edeae4]/50 hover:text-[#00aaff] transition-colors cursor-pointer w-7 h-7 rounded-full hover:bg-white/5 flex items-center justify-center border-none bg-transparent"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCcwIcon className="text-sm" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[#edeae4]/50 hover:text-[#00aaff] transition-colors cursor-pointer w-7 h-7 rounded-full hover:bg-white/5 flex items-center justify-center border-none bg-transparent"
                  aria-label="Collapse panel"
                >
                  <XIcon className="text-sm" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto px-5 py-4 space-y-4 font-manrope text-sm flex flex-col bg-transparent z-10">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"} w-full`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed text-left ${isUser
                          ? "bg-[#00aaff] text-[#0a1628] rounded-tr-none font-medium"
                          : "bg-[#edeae4]/10 text-[#edeae4] border border-[#edeae4]/10 rounded-tl-none"
                        }`}
                    >
                      {!isUser ? (
                        msg.isStreaming ? (
                          <TypewriterText
                            text={msg.text}
                            onComplete={() => {
                              msg.isStreaming = false;
                            }}
                          />
                        ) : (
                          <ReactMarkdown components={markdownComponents}>{stripTables(msg.text)}</ReactMarkdown>
                        )
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Pulsing Loading Dots */}
              {loading && (
                <div className="flex items-center gap-1.5 bg-[#edeae4]/10 text-[#edeae4] border border-[#edeae4]/10 rounded-2xl rounded-tl-none px-4 py-3 max-w-[50px] mr-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#edeae4] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#edeae4] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#edeae4] animate-bounce" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PERSISTENT PILL INPUT BAR */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-full bg-gradient-to-b from-white/35 to-[#edeae4]/20 hover:from-white/40 hover:to-[#edeae4]/25 backdrop-blur-xl border border-white/45 shadow-[0_12px_36px_rgba(0,170,255,0.14)] hover:shadow-[0_12px_44px_rgba(0,170,255,0.22)] rounded-full p-1.5 flex items-center gap-2.5 transition-all duration-300 relative overflow-hidden cursor-text"
      >
        {/* Glossy sheen reflection overlay matching reference */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Left Side: Avatar Badge */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="bg-transparent border-none outline-none cursor-pointer flex-shrink-0"
          aria-label="Toggle chat history"
        >
          <BotAvatar />
        </button>

        {/* Middle Input Bar */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask AI anything..."
          className="min-w-0 flex-grow bg-transparent border-none outline-none text-sm text-[#0a1628] placeholder-[#0a1628]/60 font-manrope py-2 px-1 focus:ring-0"
          disabled={loading}
        />

        {/* Right Side: Solid Send Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSend();
          }}
          disabled={!inputValue.trim() || loading}
          className="w-10 h-10 rounded-full bg-[#00aaff] hover:bg-[#0099ee] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,170,255,0.35)] transition-all duration-200 cursor-pointer flex-shrink-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none border-none"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
