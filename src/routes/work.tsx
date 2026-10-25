import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ContactBand } from "@/components/site";
import { Reveal } from "@/components/motion";
import { BriklineCaseStudy } from "@/components/brikline-case-study";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Client Impact & Production Systems — Tensra AI" },
      { name: "description", content: "Detailed engineering case studies of full-scale integration architectures deployed into live business operations." },
      { property: "og:title", content: "Client Impact & Production Systems — Tensra AI" },
      { property: "og:description", content: "Detailed engineering case studies of full-scale integration architectures deployed into live business operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});


function Work() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1240px] px-6 pb-4 pt-10 md:pt-12">
        <Reveal>
          <div className="mb-7 max-w-4xl">
            <p className="text-xs font-semibold text-primary">Case Studies</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-navy md:text-5xl">Client Impact &amp; Production Systems</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">Detailed engineering case studies of full-scale integration architectures deployed into live business operations.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <BriklineCaseStudy />
        </Reveal>
      </section>
      <ContactBand />
    </SiteLayout>
  );
}
