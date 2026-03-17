"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

  const renderedMessages = useMemo(() => {
    return messages.map((message) => {
      const isUser = message.sender === "user";

      return (
        <div
          key={message.id}
          className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={[
              "max-w-[82%] rounded-[18px] px-4 py-3 text-[14px] leading-[1.45] shadow-sm whitespace-pre-line",
              isUser
                ? "bg-[#DCF8C6] text-black rounded-br-[6px]"
                : "bg-white text-black rounded-bl-[6px] border border-black/5",
            ].join(" ")}
          >
            {message.text}
          </div>
        </div>
      );
    });
  }, [messages]);

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-[360px] max-w-full">
        <div className="absolute inset-0 -z-10 rounded-[42px] bg-[#25D366]/10 blur-2xl" />

        <div className="rounded-[38px] border border-black/10 bg-[#111111] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
          <div className="relative overflow-hidden rounded-[30px] bg-[#EDE5DD]">
            <div className="absolute left-1/2 top-2 z-30 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

            <div className="relative z-20 flex h-[78px] items-end justify-between bg-[#075E54] px-4 pb-3 pt-8 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white">
                  V
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold">
                    Vyalo Concierge
                  </div>
                  <div className="truncate text-[12px] text-white/80">
                    Typically replies instantly
                  </div>
                </div>
              </div>

              <div className="text-[13px] text-white/85">WhatsApp</div>
            </div>

            <div className="h-[560px] bg-[#EDE5DD]">
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto px-3 pb-4 pt-4"
                style={{
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex min-h-full flex-col gap-3">
                  {renderedMessages}
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 bg-[#F0F2F5] px-3 py-3">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-[#9CA3AF] shadow-sm">
                <span className="text-[16px]">+</span>
                <span className="flex-1">Message</span>
                <span>🎤</span>
              </div>
            </div>
          </div>
        </div>

        {isRestarting && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[38px] bg-white/30 backdrop-blur-[1px]">
            <div className="rounded-full bg-black/70 px-4 py-2 text-sm text-white">
              Restarting demo…
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FCFCF8] text-[#111111]">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <div className="inline-flex items-center rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#128C7E]">
            Live WhatsApp Concierge Demo
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Meet Vyalo — Cefalù’s live local concierge.
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#4B5563]">
            Restaurants, airport transfers, activities, and real local help —
            all through a simple WhatsApp-style experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#374151]">
            <span className="rounded-full bg-black/5 px-4 py-2">
              Restaurants
            </span>
            <span className="rounded-full bg-black/5 px-4 py-2">
              Airport Transfers
            </span>
            <span className="rounded-full bg-black/5 px-4 py-2">
              Events & Activities
            </span>
            <span className="rounded-full bg-black/5 px-4 py-2">
              Local Help
            </span>
          </div>
        </div>

        <VyaloPhoneDemo />
      </section>
    </main>
  );
}
