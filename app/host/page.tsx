import type { Metadata } from "next";
import Link from "next/link";
import { HOST_COPY } from "./copy";
import HostApplicationForm from "./HostApplicationForm";

export const metadata: Metadata = {
  title: `${HOST_COPY.meta.title} | Vyalo`,
  description: HOST_COPY.meta.description,
};

function IntroSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#e5e3dc] py-8 first:border-t-0 first:pt-0">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-[#34A853]">{eyebrow}</p>
      <h2 className="mt-2 max-w-[520px] text-[20px] font-semibold leading-[1.3] text-[#111111]">
        {title}
      </h2>
      <div className="mt-3 max-w-[560px] text-[15px] leading-[1.75] text-[#5f6876]">{children}</div>
    </section>
  );
}

export default function HostApplicationPage() {
  return (
    // The root layout's <html> is lang="en" (it also serves the bilingual
    // homepage, so it can't be flipped globally without a second root
    // layout — see Stage 3A report). This page's own content is Italian
    // only, so it declares that explicitly on its own subtree, which is
    // valid HTML and what assistive tech/translation tools actually key
    // off for a specific block of content.
    <main lang="it" className="min-h-screen bg-[#f6f6f3] text-[#111111]">
      <div className="mx-auto max-w-[720px] px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center" aria-label="Vyalo — torna alla home">
            <img src="/vyalo-lockup.png" alt="Vyalo" className="h-7 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-[13px] font-semibold text-[#5f6876] transition-colors hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]"
          >
            ← {HOST_COPY.backToVyalo}
          </Link>
        </div>

        <p className="mb-3 text-[14px] font-semibold text-[#34A853]">{HOST_COPY.hero.eyebrow}</p>
        <h1 className="max-w-[560px] text-[clamp(1.9rem,4vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#111111]">
          {HOST_COPY.hero.title}
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.8] text-[#697586]">
          {HOST_COPY.hero.intro}
        </p>
        <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#5f6876]">
          {HOST_COPY.hero.note}
        </p>

        <div className="mt-14">
          <IntroSection eyebrow={HOST_COPY.intro.whatIsVyalo.eyebrow} title={HOST_COPY.intro.whatIsVyalo.title}>
            <p>{HOST_COPY.intro.whatIsVyalo.body}</p>
          </IntroSection>

          <IntroSection eyebrow={HOST_COPY.intro.whyActivate.eyebrow} title={HOST_COPY.intro.whyActivate.title}>
            <ul className="space-y-2">
              {HOST_COPY.intro.whyActivate.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#edf7f0] text-[10px] text-[#34A853]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </IntroSection>

          <IntroSection eyebrow={HOST_COPY.intro.whatsNext.eyebrow} title={HOST_COPY.intro.whatsNext.title}>
            <ol className="space-y-2">
              {HOST_COPY.intro.whatsNext.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf7f0] text-[11px] font-semibold text-[#34A853]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </IntroSection>
        </div>

        <div className="mt-12">
          <HostApplicationForm />
        </div>
      </div>
    </main>
  );
}
