"use client";

import { useMemo, useState } from "react";

type TabKey = "about" | "hosts" | "partners" | "contact";

const TAB_CONTENT: Record<
  TabKey,
  {
    eyebrow?: string;
    title: string;
    body: string;
  }
> = {
  about: {
    eyebrow: "Live local help in Cefalù",
    title:
      "Restaurants, activities, airport transfers, and real local help — all through a simple WhatsApp-style experience.",
    body:
      "Vyalo gives guests one trusted local point of contact for the things that matter most: where to eat, what to do, how to get around, and who to message when something unexpected happens.",
  },
  hosts: {
    eyebrow: "A better guest experience",
    title:
      "Give your guests fast local support without adding more messages, stress, or late-night interruptions to your day.",
    body:
      "Vyalo helps hosts offer a more premium stay by handling common guest needs like recommendations, transport coordination, and local guidance — while you stay focused on your property.",
  },
  partners: {
    eyebrow: "Built for local businesses",
    title:
      "Vyalo connects trusted local operators with travelers who are actively looking for places to eat, book, visit, and enjoy.",
    body:
      "From restaurants and beach clubs to drivers and activity providers, partners get better visibility inside a concierge flow designed to feel curated, local, and easy to use.",
  },
  contact: {
    eyebrow: "Start the conversation",
    title:
      "Interested in bringing Vyalo to your apartment, business, or guest experience? Let’s talk.",
    body:
      "Whether you’re a host, partner, or simply curious about the project, reach out and we’ll show you how Vyalo can fit naturally into the Cefalù guest journey.",
  },
};

function VyaloBubbleO({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block align-middle ${className}`}
      aria-hidden="true"
    >
      <span className="relative block h-[0.9em] w-[0.9em] rounded-full bg-[#22c55e]">
        <span className="absolute left-[27%] top-[41%] h-[0.11em] w-[0.11em] -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute left-[45%] top-[41%] h-[0.11em] w-[0.11em] -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute left-[63%] top-[41%] h-[0.11em] w-[0.11em] -translate-y-1/2 rounded-full bg-white" />
      </span>
      <span className="absolute bottom-[0.03em] left-[0.08em] h-[0.22em] w-[0.22em] rotate-45 rounded-[0.06em] bg-[#22c55e]" />
    </span>
  );
}

function VyaloWordmark() {
  return (
    <span className="inline-flex items-end leading-none">
      <span className="text-[#22c55e]">vyal</span>
      <VyaloBubbleO className="ml-[0.02em] translate-y-[-0.02em]" />
    </span>
  );
}

/**
 * DO NOT TOUCH THIS BLOCK.
 * This is preserved from the prior version the user pasted.
 */
function ChatSimulation() {
  return (
    <div className="flex w-full justify-center xl:justify-end">
      <div className="w-full max-w-[430px]">
        <div className="rounded-[3.2rem] border-[14px] border-black bg-[#e9dfd3] shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-[#e9dfd3]">
            <div className="absolute left-1/2 top-3 z-20 h-8 w-44 -translate-x-1/2 rounded-full bg-black" />

            <div className="bg-[#056b5c] px-5 pb-4 pt-10 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] font-semibold text-white">
                  v
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-semibold leading-none sm:text-[16px]">
                    Vyalo Concierge
                  </div>
                  <div className="mt-1 text-[11px] text-white/80 sm:text-[12px]">
                    Typically replies instantly
                  </div>
                </div>
                <div className="text-[13px] font-medium text-white/90 sm:text-[14px]">
                  WhatsApp
                </div>
              </div>
            </div>

            <div className="space-y-5 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              <div className="flex justify-end">
                <div className="rounded-2xl bg-[#d9efc2] px-4 py-3 text-[16px] text-black shadow-sm">
                  1
                </div>
              </div>

              <div className="max-w-[82%] rounded-[1.55rem] bg-white px-5 py-4 text-black shadow-sm">
                <div className="mb-3 text-[16px] font-medium">Main Menu</div>
                <div className="space-y-[2px] text-[15px] leading-7 sm:text-[16px]">
                  <div>1 🍝 Restaurants & Reservations</div>
                  <div>2 💌 Events & Activities</div>
                  <div>3 ✈️ Airport Transfers</div>
                  <div>4 🧸 Kids Activities</div>
                  <div>5 🏖️ Beach Clubs</div>
                  <div>6 🧭 Excursions</div>
                  <div>7 🚆 Trains & Transport</div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="rounded-2xl bg-[#d9efc2] px-4 py-3 text-[16px] text-black shadow-sm">
                  3
                </div>
              </div>

              <div className="max-w-[86%] rounded-[1.55rem] bg-white px-5 py-4 text-black shadow-sm">
                <div className="mb-4 text-[16px] font-medium">✈️ Airport Transfers</div>
                <div className="mb-5 text-[15px] leading-8 sm:text-[16px]">
                  How would you like to share your pickup point?
                </div>
                <div className="space-y-[2px] text-[15px] leading-7 sm:text-[16px]">
                  <div>1 📍 Send live location</div>
                  <div>2 📝 Type pickup address</div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 bg-[#f8f8f8] px-4 py-4 sm:px-5">
              <div className="flex items-center justify-between rounded-full border border-black/10 bg-white px-4 py-3 text-[#9aa0a6] shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[22px] leading-none">＋</span>
                  <span className="text-[15px] sm:text-[16px]">Message</span>
                </div>
                <span className="text-[20px]">🖊️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button className="rounded-full bg-[#22c55e] px-8 py-4 text-[15px] font-semibold text-[#062d17] shadow-[0_16px_34px_rgba(34,197,94,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(34,197,94,0.34)]">
            Try Vyalo on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VyaloPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const activeContent = useMemo(() => TAB_CONTENT[activeTab], [activeTab]);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "about", label: "About Vyalo" },
    { key: "hosts", label: "Hosts" },
    { key: "partners", label: "Partners" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#111111]">
      <div className="mx-auto max-w-[1600px] px-8 pt-10 lg:px-12 xl:px-14">
        <div className="grid min-h-screen grid-cols-1 gap-10 xl:grid-cols-[1.05fr_470px] xl:items-start xl:gap-12">
          <section className="pt-2 xl:pt-6">
            <div className="max-w-[860px]">
              <div className="mb-12 flex flex-wrap gap-3">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={[
                        "rounded-full px-7 py-3 text-[15px] font-semibold transition-all duration-200 sm:text-[16px]",
                        isActive
                          ? "bg-white text-[#111111] shadow-[0_10px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
                          : "bg-[#ecebe7] text-[#5a6472] hover:bg-[#e6e5e1] hover:text-[#111111]",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="max-w-[920px]">
                <h1 className="flex flex-wrap items-end gap-x-1 gap-y-2 text-[clamp(4.6rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#0b0b0b]">
                  <span>Meet</span>
                  <span className="inline-flex items-end">
                    <VyaloWordmark />
                  </span>
                </h1>

                <p className="mt-4 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#111111]">
                  Your live local concierge.
                </p>

                <div className="mt-12">
                  {activeContent.eyebrow ? (
                    <div className="mb-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#22c55e]">
                      {activeContent.eyebrow}
                    </div>
                  ) : null}

                  <p className="max-w-[920px] text-[clamp(1.8rem,2.9vw,3.1rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[#667085]">
                    {activeContent.title}
                  </p>

                  <p className="mt-8 max-w-[820px] text-[18px] leading-[1.75] text-[#697586]">
                    {activeContent.body}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="justify-self-center xl:justify-self-end">
            <ChatSimulation />
          </aside>
        </div>
      </div>
    </main>
  );
}
