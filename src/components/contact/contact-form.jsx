"use client";

import * as React from "react";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

const subjects = [
"General Enquiry",
"Product Information",
"Custom Furniture",
"Bulk / Corporate Order",
"After-Sales Support"];

export function ContactForm() {
  const [status, setStatus] = React.useState("idle");

  function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900); // demo submission
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <Check size={32} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">Message sent!</h3>
        <p className="mt-2 max-w-sm text-warmbrown/80">
          Thank you for reaching out. Our team will get back to you within a few
          hours. For an instant response, message us on WhatsApp.
        </p>
        <Button asChild variant="whatsapp" size="lg" className="mt-6">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </Button>
      </div>);

  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8">

      <h2 className="font-display text-2xl font-semibold text-charcoal">
        Send us a message
      </h2>
      <p className="mt-1.5 text-sm text-warmbrown/70">
        Fill in the form and we'll be in touch shortly — or reach us instantly on
        WhatsApp.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" name="name" placeholder="Your name" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 ..." />
        </div>
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required={false} />
        
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-charcoal">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/15">
            
            {subjects.map((s) =>
            <option key={s}>{s}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us how we can help…"
            className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/15" />
          
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading"}>
          
          {status === "loading" ?
          <>
              <Loader2 className="animate-spin" size={18} /> Sending…
            </> :

          <>
              <Send size={18} /> Send Message
            </>
          }
        </Button>
      </div>
    </form>);

}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true

}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/15" />
      
    </div>);

}
