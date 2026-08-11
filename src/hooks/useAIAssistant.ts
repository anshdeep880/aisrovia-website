import { useState } from "react";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  isStreaming?: boolean;
}

export function useAIAssistant() {
  const [loading, setLoading] = useState(false);

  const getAIResponse = async (history: ChatMessage[]): Promise<string> => {
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error(`API returned error status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.";
    } catch (err) {
      console.error("Failed to fetch AI response:", err);
      return "I'm having trouble connecting right now. Please try contacting us on WhatsApp (+91 72489 60113) or visit our Contact page.";
    } finally {
      setLoading(false);
    }
  };

  return {
    getAIResponse,
    loading,
  };
}
