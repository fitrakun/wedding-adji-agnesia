"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface GuestMessage {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

export function GuestMessagesSection() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const supabase = createSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("rsvps")
        .select("id, guest_name, message, created_at")
        .neq("message", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching guest messages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    function handleSubmitted() {
      void fetchMessages();
    }
    window.addEventListener("rsvp:submitted", handleSubmitted);
    const timer = setTimeout(() => void fetchMessages(), 0);
    return () => {
      window.removeEventListener("rsvp:submitted", handleSubmitted);
      clearTimeout(timer);
    };
  }, [fetchMessages]);

  return (
    <section className="guest-messages-section" aria-labelledby="guest-messages-title">
      <div className="section-content guest-messages-content">
        <div className="messages-grid">
          {loading ? (
            ''
          ) : messages.length === 0 ? (
            ''
          ) : (
            messages.map((msg) => (
              <article key={msg.id} className="message-post" data-message-post>
                <h3 className="message-name"><span className="message-from">From:</span> {msg.guest_name}</h3>
                <p className="message-content">{msg.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
