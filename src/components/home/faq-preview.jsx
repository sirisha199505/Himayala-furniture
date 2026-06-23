import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent } from
"@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FaqPreview() {
  const top = faqs.slice(0, 5);
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              Questions, answered
            </h2>
            <p className="mt-4 text-warmbrown/80">
              Everything you need to know about our furniture, delivery,
              installation and warranty.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <HelpCircle size={22} />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-charcoal">Still curious?</p>
                <p className="text-muted">Our team is a message away.</p>
              </div>
            </div>
            <Button asChild className="mt-6">
              <Link href="/faq">
                View All FAQs <ArrowRight size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {top.map((f) =>
              <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>);

}
