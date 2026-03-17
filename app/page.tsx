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
      type: "pause";
      duration: number;
    };

const FLOW: FlowStep[] = [
  {
    type: "message",
    sender: "system",
    text: "Choose your language\n\n🇬🇧 English\n🇮🇹 Italiano",
    delayAfter: 1100,
  },
  {
    type: "message",
    sender: "user",
    text: "English",
    delayAfter: 900,
  },
  {
    type: "message",
    sender: "system",
    text:
      "Main Menu\n\n" +
      "1. Restaurants\n" +
      "2. Airport Transfers\n" +
      "3. Events & Activities\n" +
      "4. Beach Clubs\n" +
      "5. Kids Activities\n" +
      "6. Local Help",
    delayAfter: 1300,
  },
  {
    type: "message",
    sender: "user",
    text: "Airport Transfers",
    delayAfter: 900,
  },
  {
    type: "message",
    sender: "system",
    text: "Where is your pickup point?",
    delayAfter: 1100,
  },
  {
    type: "message",
    sender: "user",
    text: "Palermo Airport",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "system",
    text: "How many guests?",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "user",
    text: "2",
    delayAfter: 900,
  },
  {
    type: "message",
    sender: "system",
    text: "How many bags?",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "user",
    text: "3",
    delayAfter: 900,
  },
  {
    type: "message",
    sender: "system",
    text: "What time is your pickup?",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "user",
    text: "6:30 PM",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "system",
    text: "Name for the driver?",
    delayAfter: 1000,
  },
  {
    type: "message",
    sender: "user",
    text: "Marco",
    delayAfter: 900,
  },
  {
    type: "message",
    sender: "system",
    text:
      "Perfect — confirming your driver now.\n\n" +
      "Pickup: Palermo Airport\n" +
      "Guests: 2\n" +
      "Bags: 3\n" +
      "Time: 6:30 PM\n" +
      "Name: Marco",
    delayAfter: 1800,
  },
  {
    type: "message",
    sender: "system",
    text:
      "✅ Driver confirmed\n\n" +
      "Your airport transfer is being arranged.\n" +
      "Your driver will have your pickup details.",
    delayAfter: 3400,
  },
  {
    type: "pause",
    duration: 2800,
  },
  {
    type: "pause",
    duration: 500,
  },
];

function VyaloPhoneDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(1);

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
    setIsRestarting(true);
    clearCurrentTimer();

    timeoutRef.current = setTimeout(() => {
      idRef.current = 1;
      setMessages([]);
      setStepIndex(0);
      setIsRestarting(false);
    }, 400);
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
  }, [messages]);

  useEffect(() => {
    if (isRestarting) return;

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

    timeoutRef.current = setTimeout(() => {
      pushMessage(step.sender, step.text);

      timeoutRef.current = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, step.delayAfter ?? 1000);
    }, 260);

    return () => {
      clearCurrentTimer();
    };
  }, [stepIndex, isRestarting]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
                height: 560,
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
                            border: isUser ? "none" : "1px solid rgba(0,0,0,0.05)",
                            borderBottomRightRadius: isUser ? 6 : 18,
                            borderBottomLeftRadius: isUser ? 18 : 6,
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    );
                  })}
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

        {isRestarting && (
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 38,
              background: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(1px)",
            }}
          >
            <div
              style={{
                borderRadius: 9999,
                background: "rgba(0,0,0,0.7)",
                padding: "8px 16px",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Restarting demo…
            </div>
          </div>
        )}
      </div>
    </div>
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
  return (
    <main
      style={{
        minHeight: "100vh",
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
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: 48,
          padding: "64px 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 9999,
              border: "1px solid rgba(37, 211, 102, 0.2)",
              background: "rgba(37, 211, 102, 0.1)",
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#128C7E",
            }}
          >
            Live WhatsApp Concierge Demo
          </div>

          <h1
            style={{
              marginTop: 24,
              marginBottom: 0,
              fontSize: 56,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Meet Vyalo — Cefalù’s live local concierge.
          </h1>

          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              fontSize: 24,
              lineHeight: 1.6,
              color: "#4B5563",
            }}
          >
            Restaurants, airport transfers, activities, and real local help —
            all through a simple WhatsApp-style experience.
          </p>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Tag>Restaurants</Tag>
            <Tag>Airport Transfers</Tag>
            <Tag>Events & Activities</Tag>
            <Tag>Local Help</Tag>
          </div>
        </div>

        <VyaloPhoneDemo />
      </section>
    </main>
  );
}
