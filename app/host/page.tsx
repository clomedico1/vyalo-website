import type { Metadata } from "next";
import Link from "next/link";
import { HOST_COPY } from "./copy";
import HostApplicationForm from "./HostApplicationForm";

export const metadata: Metadata = {
  title: `${HOST_COPY.meta.title} | Vyalo`,
  description: HOST_COPY.meta.description,
};

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

        <div className="mt-12">
          <HostApplicationForm />
        </div>
      </div>
    </main>
  );
}
