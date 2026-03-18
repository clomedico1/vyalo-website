"use client";

import { useEffect, useRef, useState } from "react";

type Sender = "system" | "user";

type Message = {
  id: number;
  sender: Sender;
  text: string;
};

type FlowStep =
  | {
      type: "message";
      sender: Sender;
      text: string;
      delayAfter?: number;
    }
  | {
      type: "typing";
      sender: "user";
      duration: number;
      nextText: string;
      delayAfter?: number;
    }
  | {
      type: "pause";
      duration: number;
    };

const FLOW: FlowStep[] = [
  {
    type: "message",
    sender: "system",
    text:
      "Welcome to Vyalo.\n\n" +
      "Your live local concierge in Cefalù.\n\n" +
      "Please choose your language:\n\n" +
      "1 🇬🇧 English\n" +
      "2 🇮🇹 Italian\n" +
      "3 🇫🇷 French",
    delayAfter: 1400,
  },
  {
    type: "typing",
    sender: "user",
    duration: 1200,
    nextText: "1",
    delayAfter: 700,
  },
  {
    type: "message",
    sender: "system",
    text:
      "Main Menu\n\n" +
      "1 🍝 Restaurants & Reservations\n" +
      "2 🎟 Events & Activities\n" +
      "3 ✈️ Airport Transfers\n" +
      "4 👨‍👩‍👧 Kids Activities\n" +
      "5 🏖 Beach Clubs\n" +
      "6 🧭 Excursions\n" +
      "7 🚆 Trains & Transport",
    delayAfter: 1500,
  },
  {
    type: "typing",
    sender: "user",
    duration: 1200,
    nextText: "3",
    delayAfter: 700,
  },
  {
    type: "message",
    sender: "system",
    text:
      "✈️ Airport Transfers\n\n" +
      "How would you like to share your pickup point?\n\n" +
      "1 📍 Send live location\n" +
      "2 📝 Type pickup address",
    delayAfter: 1300,
  },
  {
    type: "typing",
    sender: "user",
    duration: 1100,
    nextText: "1",
    delayAfter: 650,
  },
  {
    type: "message",
    sender: "system",
    text: "Please send your live pickup location.",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "user",
    text: "📍 Live location\nPiazza Garibaldi, Cefalù",
    delayAfter: 1200,
  },
  {
    type: "message",
    sender: "system",
    text:
      "Destination\n\n" +
      "1 ✈️ Palermo Airport\n" +
      "2 🏙 Palermo City Centre\n" +
      "3 🚉 Cefalù Station",
    delayAfter: 1200,
  },
  {
    type: "typing",
    sender: "user",
    duration: 1100,
    nextText: "1",
    delayAfter: 650,
  },
  {
    type: "message",
    sender: "system",
    text: "How many guests will be travelling?",
    delayAfter: 1000,
  },
  {
    type: "typing",
    sender: "user",
    duration: 950,
    nextText: "2",
    delayAfter: 600,
  },
  {
    type: "message",
    sender: "system",
    text: "How many bags should the driver expect?",
    delayAfter: 1000,
  },
  {
    type: "typing",
    sender: "user",
    duration: 950,
    nextText: "3",
    delayAfter: 600,
  },
  {
    type: "message",
    sender: "system",
    text: "Name for the driver?",
    delayAfter: 950,
  },
  {
    type: "typing",
    sender: "user",
    duration: 1000,
    nextText: "Marco",
    delayAfter: 700,
  },
  {
    type: "message",
    sender: "system",
    text:
      "Perfect — confirming your driver now.\n\n" +
      "📍 Pickup: Piazza Garibaldi, Cefalù\n" +
      "✈️ Destination: Palermo Airport\n" +
      "👥 Guests: 2\n" +
      "🧳 Bags: 3\n" +
      "🙋 Name: Marco",
    delayAfter: 1900,
  },
  {
    type: "message",
    sender: "system",
    text:
      "✅ Driver confirmed\n\n" +
      "Your transfer request has been accepted.\n" +
      "Your driver will receive your pickup details shortly.",
    delayAfter: 3200,
  },
  {
    type: "pause",
    duration: 2200,
  },
];

function TypingBubble() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          borderRadius: 18,
          padding: "12px 16px",
          background: "#DCF8C6",
          color: "#000000",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          borderBottomRightRadius: 6,
          display: "flex",
          gap: 4,
        }}
      >
        {[0,1,2].map((i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#6B7280",
              display: "inline-block",
              animation: "vyaloTyping 1.4s infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        <style>
          {`
            @keyframes vyaloTyping {
              0% { opacity: 0.3; transform: translateY(0px); }
              25% { opacity: 1; transform: translateY(-3px); }
              50% { opacity: 0.3; transform: translateY(0px); }
              100% { opacity: 0.3; transform: translateY(0px); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

function usePageScrollPause(timeoutMs = 3500) {
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setPaused(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setPaused(false);
      }, timeoutMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeoutMs]);

  return paused;
}

function useWindowWidth() {
  const [width, setWidth] = useState<number>(1200);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
function humanizeDelay(base: number) {
  const variance = Math.floor(Math.random() * 220) - 110;
  return Math.max(250, base + variance);
}
function VyaloPhoneDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [showUserTyping, setShowUserTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(1);

  const pagePaused = usePageScrollPause(4000);

  const clearCurrentTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const pushMessage = (sender: Sender, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        sender,
        text,
      },
    ]);
  };

  const resetDemo = () => {
    setShowUserTyping(false);
    clearCurrentTimer();

    timeoutRef.current = setTimeout(() => {
      idRef.current = 1;
      setMessages([]);
      setStepIndex(0);
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearCurrentTimer();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const frame = requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [messages, showUserTyping]);

  useEffect(() => {
    if (pagePaused) return;

    if (stepIndex >= FLOW.length) {
      resetDemo();
      return;
    }

    const step = FLOW[stepIndex];
    clearCurrentTimer();

    if (step.type === "pause") {
      timeoutRef.current = setTimeout(() => {
        if (stepIndex === FLOW.length - 1) {
          resetDemo();
        } else {
          setStepIndex((prev) => prev + 1);
        }
      }, step.duration);

      return;
    }

    if (step.type === "typing") {
      setShowUserTyping(true);

    timeoutRef.current = setTimeout(() => {
  setShowUserTyping(false);
  pushMessage("user", step.nextText);

  timeoutRef.current = setTimeout(() => {
    setStepIndex((prev) => prev + 1);
  }, humanizeDelay(step.delayAfter ?? 700));
}, humanizeDelay(step.duration)); 

      return;
    }

 timeoutRef.current = setTimeout(() => {
  pushMessage(step.sender, step.text);

  timeoutRef.current = setTimeout(() => {
    setStepIndex((prev) => prev + 1);
  }, humanizeDelay(step.delayAfter ?? 1000));
}, humanizeDelay(260));

    return () => {
      clearCurrentTimer();
    };
  }, [stepIndex, pagePaused]);

  return (
    <>
  <style>
    {`
      @keyframes vyaloFadeIn {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    `}
  </style>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 360,
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            borderRadius: 42,
            background: "rgba(37, 211, 102, 0.12)",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            borderRadius: 38,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "#111111",
            padding: 10,
            boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 30,
              background: "#EDE5DD",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 8,
                transform: "translateX(-50%)",
                width: 128,
                height: 24,
                borderRadius: 9999,
                background: "#000",
                zIndex: 30,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 20,
                display: "flex",
                height: 78,
                alignItems: "flex-end",
                justifyContent: "space-between",
                background: "#075E54",
                padding: "32px 16px 12px 16px",
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  minWidth: 0,
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  V
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Vyalo Concierge
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.8)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Typically replies instantly
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  flexShrink: 0,
                }}
              >
                WhatsApp
              </div>
            </div>

            <div
              style={{
                height: 520,
                background: "#EDE5DD",
              }}
            >
              <div
                ref={scrollRef}
                style={{
                  height: "100%",
                  overflowY: "auto",
                  padding: "16px 12px",
                  boxSizing: "border-box",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    minHeight: "100%",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {messages.map((message) => {
                    const isUser = message.sender === "user";

                    return (
                      <div
                        key={message.id}
                       style={{
  display: "flex",
  width: "100%",
  justifyContent: isUser ? "flex-end" : "flex-start",
  animation: "vyaloFadeIn 0.25s ease",
}}
                      >
                        <div
                          style={{
                            maxWidth: "82%",
                            borderRadius: 18,
                            padding: "12px 16px",
                            fontSize: 14,
                            lineHeight: 1.45,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            whiteSpace: "pre-line",
                            background: isUser ? "#DCF8C6" : "#FFFFFF",
                            color: "#000000",
                            border: isUser
                              ? "none"
                              : "1px solid rgba(0,0,0,0.05)",
                            borderBottomRightRadius: isUser ? 6 : 18,
                            borderBottomLeftRadius: isUser ? 18 : 6,
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    );
                  })}

                  {showUserTyping && <TypingBubble />}
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.05)",
                background: "#F0F2F5",
                padding: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 9999,
                  background: "#FFFFFF",
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#9CA3AF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <span style={{ fontSize: 16 }}>+</span>
                <span style={{ flex: 1 }}>Message</span>
                <span>🎤</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/14155238886"
        target="_blank"
rel="noopener noreferrer"
        onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 16px 36px rgba(37,211,102,0.35)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0px)";
  e.currentTarget.style.boxShadow = "0 10px 24px rgba(37,211,102,0.25)";
}}
        style={{
          marginTop: 14,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9999,
          background: "#25D366",
          color: "#083B2C",
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
          padding: "12px 20px",
          boxShadow: "0 10px 24px rgba(37,211,102,0.2)",
          transition: "all 0.2s ease",
          cursor: "pointer",          
        }}
      >
        Try Vyalo on WhatsApp
      </a>

    </div>
  </>
  );
}


function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        borderRadius: 9999,
        background: "rgba(0,0,0,0.05)",
        padding: "10px 16px",
        fontSize: 14,
        color: "#374151",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

export default function Page() {
  const width = useWindowWidth();
  const isMobile = width < 980;

  return (
    <main
      style={{
        minHeight: "auto",
        overflowX: "hidden",
        background: "#FCFCF8",
        color: "#111111",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <section
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: 1200,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          alignItems: "center",
          gap: isMobile ? 36 : 48,
          padding: isMobile ? "36px 20px 44px" : "44px 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            order: isMobile ? 1 : 0,
          }}
        >
         
<div
  style={{
    marginBottom: 20,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  }}
>
  <Tag>About Vyalo</Tag>
  <Tag>Hosts</Tag>
  <Tag>Partners</Tag>
  <Tag>Contact</Tag>
</div>
          <h1
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: isMobile ? 40 : 56,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              maxWidth: 520,
            }}
          >
            <span style={{ fontSize: isMobile ? 56 : 80, display: "block" }}>
  Meet Vyalo
</span>

<span style={{ fontSize: isMobile ? 22 : 28, display: "block", marginTop: 10 }}>
  Your live local Concierge.
</span>
          </h1>

          <p
            style={{
              marginTop: 16,
              marginBottom: 0,
              fontSize: isMobile ? 20 : 24,
              lineHeight: 1.6,
              color: "#4B5563",
            }}
          >
            Restaurants, activities, airport transfers, and real local help — all through a simple
            WhatsApp-style experience.
          </p>


        <div
          style={{
            order: isMobile ? 2 : 0,
          }}
        >
          <VyaloPhoneDemo />
        </div>
      </section>
    </main>
  );
}
