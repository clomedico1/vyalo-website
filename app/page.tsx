"use client";
import { useEffect, useMemo, useRef, useState } from "react";
type Language = "en" | "it";
type TabKey = "about" | "benefits" | "hosts" | "partners" | "contact";
const TAB_CONTENT: Record<
  Language,
  Record<
    TabKey,
    {
      eyebrow?: string;
      title: string;
      body: string;
    }
  >
> = {
  en: {
    about: {
      eyebrow: "Your live local concierge",
      title:
        "Restaurants, activities, airport transfers, and reliable local help — all in one simple WhatsApp-based concierge experience.",
      body:
        "Vyalo removes the confusion, delay, and guesswork from being in an unfamiliar destination. Guests can quickly discover trusted places, coordinate local services, and get help when plans do not go smoothly.",
    },
    benefits: {
      eyebrow: "Why Vyalo",
      title: "A better guest experience, without the usual local friction.",
      body:
        "Vyalo helps guests access reliable local recommendations, practical coordination, and real support through a familiar WhatsApp experience — reducing uncertainty and making every stay feel smoother.",
    },
    hosts: {
      eyebrow: "For hosts",
      title: "Give guests better support without taking on more messaging yourself.",
      body:
        "Vyalo helps reduce repetitive guest requests, improve responsiveness, and create a more polished stay experience — all while allowing hosts to keep their own preferred providers where they choose.",
    },
    partners: {
      eyebrow: "For partners",
      title: "Join a trusted local network designed around quality and reliability.",
      body:
        "Vyalo connects guests with carefully selected local businesses and service providers, helping quality partners stand out through better visibility, smoother coordination, and stronger guest trust.",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Interested in bringing Vyalo to your property or destination?",
      body:
        "Whether you are a host, local business, or potential partner, we would love to hear from you.",
    },
  },
  it: {
    about: {
      eyebrow: "Il tuo concierge locale su WhatsApp",
      title:
        "Ristoranti, attività, transfer aeroportuali e assistenza locale affidabile — tutto in un’esperienza concierge semplice su WhatsApp.",
      body:
        "Vyalo elimina confusione, ritardi e incertezze quando ci si trova in una destinazione non familiare. Gli ospiti possono scoprire rapidamente luoghi affidabili, coordinare servizi locali e ricevere aiuto quando qualcosa non va come previsto.",
    },
    benefits: {
      eyebrow: "Perché Vyalo",
      title: "Un’esperienza migliore per gli ospiti, senza i soliti problemi locali.",
      body:
        "Vyalo aiuta gli ospiti ad accedere a consigli affidabili, coordinamento pratico e supporto reale tramite un’esperienza familiare su WhatsApp — riducendo l’incertezza e rendendo ogni soggiorno più fluido.",
    },
    hosts: {
      eyebrow: "Per host",
      title: "Offri agli ospiti un supporto migliore senza gestire più messaggi del necessario.",
      body:
        "Vyalo aiuta a ridurre le richieste ripetitive degli ospiti, migliorare la reattività e creare un soggiorno più curato — lasciando comunque agli host la libertà di mantenere i propri fornitori preferiti, quando lo desiderano.",
    },
    partners: {
      eyebrow: "Per partner",
      title: "Entra in una rete locale affidabile costruita su qualità e continuità.",
      body:
        "Vyalo collega gli ospiti a imprese locali e fornitori di servizi selezionati con attenzione, aiutando i partner di qualità a distinguersi grazie a maggiore visibilità, coordinamento più fluido e più fiducia da parte degli ospiti.",
    },
    contact: {
      eyebrow: "Contattaci",
      title: "Vuoi portare Vyalo nella tua struttura o destinazione?",
      body:
        "Che tu sia un host, un’attività locale o un potenziale partner, saremo felici di sentirti.",
    },
  },
};  
const UI_COPY = {
  en: {
    tabs: {
      about: "About Vyalo",
      benefits: "Benefits",
      hosts: "For Hosts",
      partners: "For Partners",
      contact: "Contact",
    },
    cta: "Try Vyalo on WhatsApp",
    phoneTitle: "Vyalo Concierge",
    phoneStatus: "Typically replies instantly",
    phoneInput: "Message",
    trust: {
      verifiedLine1: "Verified Local",
      verifiedLine2: "Businesses",
      secureLine1: "WhatsApp Secure",
      secureLine2: "Messaging",
      supportLine1: "Real Local Concierge",
      supportLine2: "Support",
    },
  },
  it: {
    tabs: {
      about: "Cos’è Vyalo",
      benefits: "Vantaggi",
      hosts: "Per Host",
      partners: "Per Partner",
      contact: "Contatti",
    },
    cta: "Prova Vyalo su WhatsApp",
    phoneTitle: "Concierge Vyalo",
    phoneStatus: "Di solito risponde subito",
    phoneInput: "Messaggio",
    trust: {
      verifiedLine1: "Attività Locali",
      verifiedLine2: "Verificate",
      secureLine1: "Messaggistica Sicura",
      secureLine2: "WhatsApp",
      supportLine1: "Assistenza Concierge",
      supportLine2: "Reale",
    },
  },
} as const;

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

const FLOW: Record<Language, FlowStep[]> = {
  en: [
    {
      type: "message",
      sender: "system",
      text:
        "Welcome to Vyalo.\n\n" +
        "Your live local concierge on WhatsApp.\n\n" +
        "How can I help you today?",
      delayAfter: 1400,
    },
    {
      type: "typing",
      sender: "user",
      duration: 1200,
      nextText: "I need an airport transfer.",
      delayAfter: 700,
    },
    {
      type: "message",
      sender: "system",
      text:
        "Airport Transfers\n\n" +
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
      text: "📍 Live location\nPickup shared",
      delayAfter: 1200,
    },
    {
      type: "message",
      sender: "system",
      text:
        "Destination\n\n" +
        "1 ✈️ Airport\n" +
        "2 🏙 City Centre\n" +
        "3 🚉 Train Station",
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
        "📍 Pickup: Live location received\n" +
        "✈️ Destination: Airport\n" +
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
  ],
  it: [
    {
      type: "message",
      sender: "system",
      text:
        "Benvenuto su Vyalo.\n\n" +
        "Il tuo concierge locale su WhatsApp.\n\n" +
        "Come posso aiutarti oggi?",
      delayAfter: 1400,
    },
    {
      type: "typing",
      sender: "user",
      duration: 1200,
      nextText: "Ho bisogno di un transfer per l’aeroporto.",
      delayAfter: 700,
    },
    {
      type: "message",
      sender: "system",
      text:
        "Transfer Aeroportuali\n\n" +
        "Come vuoi condividere il punto di partenza?\n\n" +
        "1 📍 Invia posizione live\n" +
        "2 📝 Scrivi indirizzo di partenza",
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
      text: "Per favore invia la tua posizione di partenza in tempo reale.",
      delayAfter: 1000,
    },
    {
      type: "message",
      sender: "user",
      text: "📍 Posizione live\nPosizione condivisa",
      delayAfter: 1200,
    },
    {
      type: "message",
      sender: "system",
      text:
        "Destinazione\n\n" +
        "1 ✈️ Aeroporto\n" +
        "2 🏙 Centro città\n" +
        "3 🚉 Stazione ferroviaria",
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
      text: "Quanti ospiti viaggiano?",
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
      text: "Quanti bagagli deve aspettarsi l’autista?",
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
      text: "Nome per l’autista?",
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
        "Perfetto — sto confermando il tuo autista.\n\n" +
        "📍 Partenza: posizione live ricevuta\n" +
        "✈️ Destinazione: Aeroporto\n" +
        "👥 Ospiti: 2\n" +
        "🧳 Bagagli: 3\n" +
        "🙋 Nome: Marco",
      delayAfter: 1900,
    },
    {
      type: "message",
      sender: "system",
      text:
        "✅ Autista confermato\n\n" +
        "La tua richiesta di transfer è stata accettata.\n" +
        "Il tuo autista riceverà a breve i dettagli del prelievo.",
      delayAfter: 3200,
    },
    {
      type: "pause",
      duration: 2200,
    },
  ],
};

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

function ChatSimulation({ language }: { language: Language }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [showUserTyping, setShowUserTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(1);

  const pagePaused = usePageScrollPause(4000);
const activeFlow = FLOW[language];
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
  clearCurrentTimer();
  idRef.current = 1;
  setMessages([]);
  setStepIndex(0);
  setShowUserTyping(false);
}, [language]);
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

    if (stepIndex >= activeFlow.length) {
      resetDemo();
      return;
    }

    const step = activeFlow[stepIndex];
    clearCurrentTimer();

    if (step.type === "pause") {
      timeoutRef.current = setTimeout(() => {
        if (stepIndex === activeFlow.length - 1) {
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
  }, [stepIndex, pagePaused, language]);

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
    inset: -80,
    zIndex: 0,
    borderRadius: 120,
    background:
      "radial-gradient(circle at 50% 50%, rgba(37,211,102,0.34) 0%, rgba(37,211,102,0.18) 30%, rgba(37,211,102,0.09) 55%, rgba(37,211,102,0.03) 72%, rgba(37,211,102,0) 100%)",
    filter: "blur(80px)",
    opacity: 1,
    pointerEvents: "none",
  }}
/>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                borderRadius: 38,
                border: "1px solid rgba(0,0,0,0.1)",
                background: "#111111",
                padding: 10,
                boxShadow: "0 30px 80px rgba(0,0,0,0.18), 0 0 60px rgba(37,211,102,0.10)",
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
                        {UI_COPY[language].phoneTitle}
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
                        {UI_COPY[language].phoneStatus}
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
                    <span style={{ flex: 1 }}>{UI_COPY[language].phoneInput}</span>
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
            {UI_COPY[language].cta}
          </a>
        </div>
      </div>
    </>
  );
}

export default function VyaloPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [language, setLanguage] = useState<Language>("en");
  const activeContent = useMemo(
  () => TAB_CONTENT[language][activeTab],
  [language, activeTab]
);

const tabs: { key: TabKey; label: string }[] = [
  { key: "about", label: UI_COPY[language].tabs.about },
  { key: "benefits", label: UI_COPY[language].tabs.benefits },
  { key: "hosts", label: UI_COPY[language].tabs.hosts },
  { key: "partners", label: UI_COPY[language].tabs.partners },
  { key: "contact", label: UI_COPY[language].tabs.contact },
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
              <div className="ml-3 flex items-center gap-2 text-[14px] font-semibold text-[#5f6876]">
  <button
    type="button"
    onClick={() => setLanguage("en")}
    className={language === "en" ? "text-[#111111]" : ""}
  >
    EN
  </button>

  <span className="opacity-40">|</span>

  <button
    type="button"
    onClick={() => setLanguage("it")}
    className={language === "it" ? "text-[#111111]" : ""}
  >
    IT
  </button>
</div>
              </div>
<div className="max-w-[920px] -mt-28">
  <div className="flex flex-col items-start text-left"> <div className="mb-10 -ml-36">  <img
    src="/vyalo-lockup.png"
    alt={
  language === "en"
    ? "Meet Vyalo — your live local concierge."
    : "Scopri Vyalo — il tuo concierge locale."
}
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
<div className="mt-6 flex items-center gap-8 text-[15px] font-medium text-[#4b5563]">  
<div className="-mt-2 flex items-center gap-10 text-[#4b5563]">
  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf7f0] text-[18px] text-[#34A853] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      ✓
    </span>
<span className="text-[15px] font-semibold leading-[1.15]">
  {UI_COPY[language].trust.verifiedLine1}
  <br/>
  {UI_COPY[language].trust.verifiedLine2}
</span>
  </div>

  <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#d7d7d2] to-transparent" />

  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf7f0] text-[18px] text-[#34A853]">
      🔒
    </span>
<span className="text-[15px] font-semibold leading-[1.15]">
  {UI_COPY[language].trust.secureLine1}
  <br/>
  {UI_COPY[language].trust.secureLine2}
</span>
  </div>

  <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#d7d7d2] to-transparent" />

  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf7f0] text-[18px] text-[#34A853]">
      👤
    </span>
<span className="text-[15px] font-semibold leading-[1.15]">
  {UI_COPY[language].trust.supportLine1}
  <br/>
  {UI_COPY[language].trust.supportLine2}
</span>
  </div>

</div>
</div>
  
</div></div>            </div>
          </section>

          <aside className="justify-self-center xl:justify-self-end">
            <ChatSimulation language={language} />
          </aside>
        </div>
      </div>
    </main>
  );
}
