"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type ChatStep = {
  id: string;
  side: "bot" | "user";
  type: "message";
  content: React.ReactNode;
  typingMs: number;
  pauseMs: number;
};

type RenderItem = {
  id: string;
  side: "bot" | "user";
  content: React.ReactNode;
};

const points = [
  "A premium support layer that feels natural — just a simple WhatsApp chat.",
  "Fast and to the point. No apps, no forms, no friction.",
  "Reliable, locally verified recommendations instead of endless review hunting.",
  "Immediate response when it matters, with human escalation when needed.",
  "No clunky chatbots.",
  "No language barriers.",
];

const travelerCards = [
  ["Restaurants", "Skip the review spiral and get locally verified suggestions faster."],
  ["Airport transfers", "Structured pickup flows with clear confirmation and local coordination."],
  ["Beaches & day plans", "Get practical recommendations based on vibe, distance, and convenience."],
  ["Kids activities", "Find family-friendly options without last-minute stress."],
  ["Local help", "Translation, guidance, and fast support when things get confusing."],
  ["Unexpected issues", "A fast first step when something goes wrong and timing matters."],
] as const;

const hostNotes = [
  "Reduce repetitive guest messages.",
  "Offer local help without being constantly on call.",
  "Improve guest confidence during the stay.",
  "Add a premium support layer to the property experience.",
  "Handle transfers, dining, and local questions more smoothly.",
  "Strengthen reviews by reducing small points of friction.",
  "Provide backup when guests need help outside normal availability.",
];

const diffCards = [
  ["Generic review platforms", "Too much noise, too little clarity."],
  ["Static host guidebooks", "Helpful, but limited and not interactive."],
  ["Basic chatbots", "Rigid, frustrating, and hard to trust."],
  ["Vyalo", "Fast, curated, local, and able to escalate when needed."],
] as const;

export default function HomePage() {
  const steps = useMemo<ChatStep[]>(
    () => [
      {
        id: "m1",
        side: "bot",
        type: "message",
        typingMs: 1200,
        pauseMs: 900,
        content: <>Meet Vyalo — your live local concierge on WhatsApp.</>,
      },
      {
        id: "m2",
        side: "bot",
        type: "message",
        typingMs: 1500,
        pauseMs: 1100,
        content: (
          <>
            Choose your language
            {"\n\n"}
            <strong className="choice">1 English</strong>
            {"\n"}
            <strong className="choice">2 Italiano</strong>
            {"\n"}
            <strong className="choice">3 Français</strong>
          </>
        ),
      },
      {
        id: "m3",
        side: "user",
        type: "message",
        typingMs: 900,
        pauseMs: 850,
        content: <strong>1</strong>,
      },
      {
        id: "m4",
        side: "bot",
        type: "message",
        typingMs: 1500,
        pauseMs: 1100,
        content: (
          <>
            How can I help today?
            {"\n\n"}
            <strong className="choice">1 Restaurants</strong>
            {"\n"}
            <strong className="choice">2 Beaches</strong>
            {"\n"}
            <strong className="choice">3 Kids activities</strong>
            {"\n"}
            <strong className="choice">4 Local tips</strong>
            {"\n"}
            <strong className="choice">7 Airport transfers</strong>
          </>
        ),
      },
      {
        id: "m5",
        side: "user",
        type: "message",
        typingMs: 900,
        pauseMs: 850,
        content: <strong>7</strong>,
      },
      {
        id: "m6",
        side: "bot",
        type: "message",
        typingMs: 1500,
        pauseMs: 1150,
        content: (
          <>
            Airport transfer request.
            {"\n\n"}
            Where should the driver pick you up?
            {"\n\n"}
            <strong className="choice">1 Nearest pickup point</strong>
            {"\n"}📍 Piazza Garibaldi
            {"\n"}
            <strong className="choice">2 Send my live location</strong>
          </>
        ),
      },
      {
        id: "m7",
        side: "user",
        type: "message",
        typingMs: 900,
        pauseMs: 850,
        content: <strong>1</strong>,
      },
      {
        id: "m8",
        side: "bot",
        type: "message",
        typingMs: 1100,
        pauseMs: 950,
        content: <>How many guests?</>,
      },
      {
        id: "m9",
        side: "user",
        type: "message",
        typingMs: 1250,
        pauseMs: 950,
        content: (
          <>
            <strong>2 guests</strong> · <strong>2 bags</strong> · <strong>07:30</strong>
          </>
        ),
      },
      {
        id: "m10",
        side: "bot",
        type: "message",
        typingMs: 1100,
        pauseMs: 950,
        content: <>Name for the driver?</>,
      },
      {
        id: "m11",
        side: "user",
        type: "message",
        typingMs: 900,
        pauseMs: 850,
        content: <strong>David</strong>,
      },
      {
        id: "m12",
        side: "bot",
        type: "message",
        typingMs: 1500,
        pauseMs: 2400,
        content: (
          <>
            ✔ Driver confirmed.
            {"\n\n"}
            Marco will pick you up at
            {"\n"}📍 Piazza Garibaldi
            {"\n"}🕖 <strong>07:30</strong>
            {"\n\n"}
            Vehicle: Mercedes V-Class
            {"\n"}License: PA 482KM
            {"\n\n"}
            Need anything else? Just send a message.
          </>
        ),
      },
    ],
    []
  );

  const [messages, setMessages] = useState<RenderItem[]>([]);
  const [typingSide, setTypingSide] = useState<"bot" | "user" | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const run = async () => {
      while (!cancelled) {
        setMessages([]);
        setFadeOut(false);

        for (const step of steps) {
          if (cancelled) return;
          setTypingSide(step.side);
          await sleep(step.typingMs);
          if (cancelled) return;
          setTypingSide(null);
          setMessages((prev) => [...prev, { id: step.id, side: step.side, content: step.content }]);
          await sleep(step.pauseMs);
        }

        if (cancelled) return;
        setFadeOut(true);
        await sleep(900);
        if (cancelled) return;
        setTypingSide(null);
        setMessages([]);
        setFadeOut(false);
        await sleep(1200);
      }
    };

    timeout = setTimeout(() => {
      void run();
    }, 700);

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [steps]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="wrap site-header-inner">
          <div className="logo">vyalo</div>
          <nav className="nav">
            <a href="#travelers">For Travelers</a>
            <a href="#hosts">For Hosts</a>
            <a href="#how">How It Works</a>
            <a href="#whatsapp">Why WhatsApp</a>
          </nav>
          <a className="btn" href="#cta">
            Start on WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="wrap hero">
          <div>
            <div className="eyebrow">Live local help, right inside WhatsApp</div>
            <h1 className="hero-title">Meet Vyalo — your live local concierge on WhatsApp.</h1>
            <p className="hero-subtitle">Your shortcut to a real local experience.</p>

            <p className="section-label">Why people use Vyalo</p>
            <div className="point-list">
              {points.map((point) => (
                <div className="point" key={point}>
                  <span className="point-dot" />
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <div className="actions">
              <a className="btn" href="#cta">
                Start on WhatsApp
              </a>
              <a className="btn-secondary" href="#how">
                How it works
              </a>
            </div>
            <p className="trust-copy">Local recommendations, practical help, and fast support in one place.</p>
          </div>

          <div className="demo-wrap">
            <div className="blur-a" />
            <div className="blur-b" />

            <motion.div
              className="demo-shell"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="demo-top">
                <div>
                  <p className="demo-kicker">Vyalo Demo</p>
                  <p className="demo-title">Live simulation</p>
                </div>
                <div className="demo-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="chat-shell">
                <div className="chat-header">
                  <div className="avatar">V</div>
                  <div>
                    <p className="chat-name">Vyalo</p>
                    <p className="chat-status">online now</p>
                  </div>
                </div>

                <motion.div
                  className="chat-viewport"
                  animate={{ opacity: fadeOut ? 0 : 1 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <div className="message-stack">
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`bubble message-bubble ${message.side}`}
                          initial={{ opacity: 0, y: 8, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          {message.content}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {typingSide ? (
                        <motion.div
                          key={`typing-${typingSide}-${messages.length}`}
                          className={`bubble typing-bubble ${typingSide}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                          <span />
                          <span />
                          <span />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="strip">
          <div className="wrap strip-inner">
            <p className="strip-copy">Built for the way people already communicate while traveling.</p>
            <span className="chip">Familiar by design</span>
            <span className="chip">Fast local coordination</span>
            <span className="chip">Verified recommendations</span>
            <span className="chip">Human backup when needed</span>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <p className="kicker">The core idea</p>
            <h2 className="section-title">Travel support should feel as easy as sending a message.</h2>
            <p className="copy">
              When people arrive somewhere new, they usually need the same things: where to eat, how to get around,
              what to do, and who to ask when something goes wrong. Most of the time, that experience is fragmented,
              slow, or unreliable. Vyalo brings practical local help into the one place people already know how to use.
            </p>

            <div className="grid-3">
              <InfoCard title="Local guidance" text="Get pointed to relevant, verified options without wasting time." />
              <InfoCard title="Fast coordination" text="Book transfers, ask questions, and solve small problems quickly." />
              <InfoCard title="Human escalation" text="When the moment matters, support can move beyond automation." />
            </div>
          </div>
        </section>

        <section className="section-tight" id="travelers">
          <div className="wrap">
            <p className="kicker">For travelers</p>
            <h2 className="section-title">What Vyalo helps with</h2>
            <div className="grid-3">
              {travelerCards.map(([title, text]) => (
                <InfoCard key={title} title={title} text={text} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="panel split">
              <div>
                <p className="kicker">Example destination</p>
                <h2 className="section-title">Designed for real destinations, not generic travel advice.</h2>
              </div>
              <p className="copy">
                Vyalo works best when it is rooted in local knowledge. Cefalù is one example: a destination where
                visitors often need restaurant help, transfer coordination, beach guidance, and practical support in
                real time. Tomorrow, the same model can scale to other towns and destinations with the same philosophy:
                local clarity, fast response, and a better visitor experience.
              </p>
            </div>
          </div>
        </section>

        <section className="section-tight" id="hosts">
          <div className="wrap">
            <p className="kicker">For hosts</p>
            <h2 className="section-title">A better guest experience, without more guest messaging.</h2>
            <p className="copy">Vyalo gives hosts a support layer they can offer guests without becoming their full-time concierge.</p>

            <div className="host-grid">
              <div className="panel">
                <p className="kicker">The philosophy behind Vyalo</p>
                <div className="host-copy" style={{ marginTop: 20 }}>
                  <p>
                    Most hosts want to offer a great experience. The problem is not intention — it is bandwidth,
                    availability, language, and the reality that guest needs do not arrive on a schedule.
                  </p>
                  <p>
                    Vyalo is built on a simple idea: <strong>hosts should not have to choose between being helpful and protecting their time.</strong>
                  </p>
                  <p>
                    Guests want fast, local, practical answers. Hosts want fewer repetitive questions, better reviews,
                    and peace of mind that someone is there when they cannot respond immediately.
                  </p>
                  <p>
                    Vyalo sits in that gap. It is not about replacing hospitality. It is about strengthening it with a
                    modern support layer that feels personal, fast, and local.
                  </p>
                  <p>
                    <strong>Better guest confidence. Less host friction. Stronger destination experience.</strong>
                  </p>
                </div>
              </div>

              <div className="host-list">
                {hostNotes.map((note) => (
                  <div className="host-note" key={note}>
                    <p>{note}</p>
                  </div>
                ))}
                <div className="host-note green">
                  <p>Vyalo helps hosts stay helpful without being overwhelmed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <p className="kicker">How it works</p>
            <h2 className="section-title">Simple on the surface. Structured underneath.</h2>
            <div className="grid-3">
              <InfoCard title="Guest starts on WhatsApp" text="No app download, no learning curve, and no extra friction." top="01" />
              <InfoCard title="Vyalo guides the request" text="Structured flows handle common needs like transfers, recommendations, and local questions." top="02" />
              <InfoCard title="Human help is there when needed" text="When the situation calls for it, support can escalate beyond automation." top="03" />
            </div>
          </div>
        </section>

        <section className="section-tight" id="whatsapp">
          <div className="wrap">
            <div className="panel why-grid">
              <div>
                <p className="kicker">Why WhatsApp</p>
                <h2 className="section-title">Because nobody wants another travel app.</h2>
              </div>
              <div>
                <p className="copy" style={{ marginTop: 0, maxWidth: "none" }}>
                  Vyalo works inside a behavior people already trust instead of forcing them into another app, another
                  login, or another interface. It feels familiar, immediate, and usable from the first message.
                </p>
                <div className="why-cards">
                  <div className="why-card"><p>Familiar and low-friction</p></div>
                  <div className="why-card"><p>Immediate communication</p></div>
                  <div className="why-card"><p>Better adoption than standalone tools</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <p className="kicker">Differentiation</p>
            <h2 className="section-title">Not another chatbot. Not another directory.</h2>
            <p className="copy">Vyalo combines local structure, verified guidance, and real escalation paths inside one simple messaging flow.</p>
            <div className="grid-4">
              {diffCards.map(([title, text]) => (
                <InfoCard key={title} title={title} text={text} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap">
            <div className="dark-panel">
              <p className="kicker">Built to scale</p>
              <div className="dark-grid">
                <h2 className="section-title" style={{ marginTop: 0, color: "#fff", maxWidth: 620 }}>
                  Built to grow destination by destination.
                </h2>
                <p className="dark-copy">
                  Vyalo starts with practical local use cases, but the model is designed to scale across towns, host
                  networks, concierge partnerships, and support layers while keeping the same core experience: simple
                  messaging, trusted local guidance, and fast response.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="cta">
          <div className="wrap">
            <div className="final-panel">
              <p className="kicker">Final call to action</p>
              <h2 className="section-title">Travel better. Host smarter.</h2>
              <p className="cta-copy">
                Start a conversation with Vyalo and see how local support can feel when it is fast, familiar, and
                actually useful.
              </p>
              <div className="actions">
                <a className="btn" href="#">Start on WhatsApp</a>
                <a className="btn-secondary" href="#hosts">For Hosts</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer-inner">
          <div>
            <strong style={{ color: "#1f1f1f" }}>vyalo</strong>
            <span style={{ marginLeft: 10 }}>Local help, structured simply.</span>
          </div>
          <div className="footer-links">
            <a href="#travelers">For Travelers</a>
            <a href="#hosts">For Hosts</a>
            <a href="#whatsapp">WhatsApp Access</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ title, text, top }: { title: string; text: string; top?: string }) {
  return (
    <div className="card">
      {top ? <div className="step-number">{top}</div> : null}
      <h3 style={{ marginTop: top ? 16 : 0 }}>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
