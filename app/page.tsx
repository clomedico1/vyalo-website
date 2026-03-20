"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TabKey = "about" | "benefits" | "hosts" | "partners" | "contact";
const TAB_CONTENT: Record<
  TabKey,
  {
    eyebrow?: string;
    title: string;
    body: string;
  }
> = {
  about: {
    eyebrow: "Your live local concierge",
    title:
      "Restaurants, activities, airport transfers, and reliable local help — all in one simple WhatsApp-based concierge experience.",
    body:
      "Vyalo connects visitors with trusted local services instantly. Instead of searching endlessly or messaging hosts for help, guests can simply open Vyalo and ask — with no language barriers. From restaurant reservations and boat tours to beach clubs, airport transfers, and unexpected travel issues, Vyalo provides a fast, friendly way to access real local assistance whenever it’s needed.",
  },

  benefits: {
    eyebrow: "Travel made simple",
    title:
"Everything a visitor needs in their destination, in one place.",
body:
"Vyalo removes the confusion, delay, and guesswork from being in an unfamiliar destination. Instead of searching through endless results, menus, reviews, and locations just to choose something as simple as a restaurant, Vyalo presents trusted local options instantly. Guests can discover great places, arrange transport, plan activities, and receive clear, reliable guidance whenever they need it — all through a simple conversation.",
  },

  hosts: {
    eyebrow: "Designed for property hosts",
    title:
      "Give your guests a local concierge while freeing yourself from constant requests.",
    body:
      "Vyalo helps hosts deliver a better guest experience while reducing the constant stream of messages about restaurants, transfers, and activities. Instead of handling every question personally, guests can rely on Vyalo for trusted local recommendations and assistance throughout their stay. Hosts gain peace of mind knowing their guests have reliable support — especially when unexpected situations arise.",
  },

  partners: {
    eyebrow: "Join the Vyalo network",
    title:
      "Partner with a platform focused on quality, reliability, and exceptional service.",
    body:
"Vyalo works with carefully selected local businesses that value professionalism, consistency, and guest satisfaction. By joining the network, partners become part of a more reliable destination experience while positioning themselves in front of quality-conscious travelers and hosts.",",
  },

  contact: {
    eyebrow: "Work with Vyalo",
    title:
      "Interested in becoming part of the Vyalo network?",
    body:
      "Vyalo partners with property hosts and carefully selected local businesses to deliver a better travel experience for visitors. If you manage guest accommodations or operate a trusted local service, we invite you to connect with us and learn more about joining the Vyalo network.",
  },
};  


function VyaloBubbleO({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 84 84"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "0.74em",
          height: "0.74em",
        }}
      >
        {/* outer bubble */}
        <path
          d="M42 6
             C61.882 6 78 22.118 78 42
             C78 61.882 61.882 78 42 78
             C35.955 78 30.258 76.51 25.252 73.879
             L12.8 78.2
             C11.95 78.495 11.018 78.283 10.38 77.645
             C9.742 77.007 9.53 76.075 9.825 75.225
             L14.121 62.845
             C11.49 57.778 10 52.056 10 46
             C10 23.909 27.909 6 50 6
             Z"
          fill="#34A853"
          transform="translate(-8 0)"
        />

        {/* inner cutout */}
        <circle cx="42" cy="42" r="19.6" fill="#F4F4F2" />

        {/* dots */}
        <circle cx="33.5" cy="42" r="2.75" fill="#34A853" />
        <circle cx="42" cy="42" r="2.75" fill="#34A853" />
        <circle cx="50.5" cy="42" r="2.75" fill="#34A853" />
      </svg>
    </span>
  );
}
function VyaloWordmark() {
  return (
    <span className="inline-flex items-end leading-none">
      <span className="text-[#34A853]">vyal</span>
      <VyaloBubbleO className="ml-[0.015em] translate-y-[-0.005em]" />
    </span>
  );
}/**
 * DO NOT TOUCH THIS BLOCK.
 * This is preserved from the prior version the user pasted.
 */
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
        {[0, 1, 2].map((i) => (
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

function humanizeDelay(base: number) {
  const variance = Math.floor(Math.random() * 220) - 110;
  return Math.max(250, base + variance);
}

function ChatSimulation() {
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

      <div className="flex w-full justify-center xl:justify-end">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
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
    inset: -18,
    zIndex: -1,
    borderRadius: 54,
    background:
      "radial-gradient(circle at 50% 35%, rgba(37,211,102,0.22) 0%, rgba(37,211,102,0.10) 42%, rgba(37,211,102,0.04) 68%, rgba(37,211,102,0) 100%)",
    filter: "blur(34px)",
    opacity: 0.95,
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
              e.currentTarget.style.boxShadow =
                "0 16px 36px rgba(37,211,102,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 10px 24px rgba(37,211,102,0.25)";
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
      </div>
    </>
  );
}

export default function VyaloPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const activeContent = useMemo(() => TAB_CONTENT[activeTab], [activeTab]);

const tabs: { key: TabKey; label: string }[] = [
  { key: "about", label: "About Vyalo" },
  { key: "benefits", label: "Benefits" },
  { key: "hosts", label: "For Hosts" },
  { key: "partners", label: "For Partners" },
  { key: "contact", label: "Contact" },
];
  return (
  <main className="min-h-screen bg-[#f6f6f3] text-[#111111]">
    <style>{`
      @keyframes vyaloTabFade {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>      <div className="mx-auto max-w-[1600px] px-8 pt-10 lg:px-12 xl:px-14">
        <div className="grid min-h-screen grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start xl:gap-10">          <section className="pt-1 xl:pt-2">            <div className="max-w-[860px]">
            <div className="relative z-20 mb-8 flex flex-nowrap gap-3">                  {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onMouseEnter={() => setActiveTab(tab.key)}
                      onClick={() => setActiveTab(tab.key)}                      className={[
  "rounded-full px-8 py-3.5 text-[15px] font-semibold transition-all duration-200 sm:text-[16px]",
  isActive
    ? "bg-white text-[#111111] shadow-[0_14px_30px_rgba(0,0,0,0.09)] ring-1 ring-black/5"
    : "bg-[#ecebe7] text-[#5f6876] hover:bg-[#e3e2de] hover:text-[#111111]",
].join(" ")}                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
<div className="max-w-[920px] -mt-28">
  <div className="flex flex-col items-start text-left"> <div className="mb-10 -ml-36">  <img
    src="/vyalo-lockup.png"
    alt="Meet Vyalo — Your live local concierge."
    className="block h-auto w-full max-w-[620px]"
  />
</div>  </div>

<div
  key={activeTab}
  className="-mt-32 ml-24 max-w-[760px] animate-[vyaloTabFade_420ms_cubic-bezier(0.22,1,0.36,1)]"
>
  {activeContent.eyebrow && (
  <p className="mb-4 text-[20px] italic font-bold text-[#111111]">
    {activeContent.eyebrow}
  </p>
)}
  <p className="max-w-[760px] text-[clamp(2.2rem,3vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#667085]">
    {activeContent.title}
  </p>

  <p className="mt-8 max-w-[700px] text-[19px] leading-[1.8] tracking-[-0.01em] text-[#697586]">
    {activeContent.body}
  </p>
</div></div>            </div>
          </section>

          <aside className="justify-self-center xl:justify-self-end">
            <ChatSimulation />
          </aside>
        </div>
      </div>
    </main>
  );
}
