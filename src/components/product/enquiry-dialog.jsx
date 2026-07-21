"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription } from
"@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { createEnquiry } from "@/lib/api";

export function EnquiryDialog({
  trigger,
  productName,
  intent = "Enquiry"

}) {
  const [status, setStatus] = React.useState(
    "idle"
  );

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      await createEnquiry({
        name: fd.get("name") || "",
        phone: fd.get("phone") || "",
        email: fd.get("email") || "",
        message: fd.get("message") || "",
        // Give staff context on what the enquiry is about.
        product: productName || intent
      });
    } catch (err) {
      // Non-blocking: still confirm to the visitor (they also get WhatsApp).
      console.error("Enquiry submission failed:", err);
    }
    setStatus("done");
  }

  return (
    <Dialog onOpenChange={(o) => !o && setTimeout(() => setStatus("idle"), 200)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {status === "done" ?
        <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <Check size={28} />
            </div>
            <DialogTitle className="text-2xl font-semibold">
              Thank you!
            </DialogTitle>
            <DialogDescription className="mt-2 text-warmbrown/80">
              Our team will get back to you within a few hours. For an instant
              response, reach us on WhatsApp.
            </DialogDescription>
            <Button
            asChild
            variant="whatsapp"
            size="lg"
            className="mt-6 w-full">
            
              <a
              href={whatsappLink(
                productName ?
                `Hi, I just enquired about the ${productName}.` :
                undefined
              )}
              target="_blank"
              rel="noopener noreferrer">
              
                Chat on WhatsApp
              </a>
            </Button>
          </div> :

        <>
            <DialogTitle className="text-2xl font-semibold">
              {intent === "Quote Request" ?
            "Request a Quote" :
            intent === "Consultation" ?
            "Book a Consultation" :
            "Enquire Now"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-warmbrown/80">
              {productName ?
            `Tell us about your interest in the ${productName}.` :
            "Share your details and our team will reach out shortly."}
            </DialogDescription>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <Field label="Full Name" name="name" placeholder="Your name" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+91 ..." />
              
                <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required={false} />
              
              </div>
              <div>
                <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-charcoal">

                  Message <span className="text-brand">*</span>
                </label>
                <textarea
                id="message"
                name="message"
                rows={3}
                required
                defaultValue={
                productName ? `I'm interested in the ${productName}.` : ""
                }
                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
                placeholder={
                intent === "Consultation" ?
                "Tell us about your space, requirements and preferred timing…" :
                "How can we help?"
                } />

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

              intent === "Quote Request" ?
              "Submit Quote Request" :
              intent === "Consultation" ?
              "Book Consultation" :
              "Submit Enquiry"
              }
              </Button>
              <p className="text-center text-xs text-muted">
                By submitting, you agree to be contacted by {`Himalayan Furniture Mart`}.
              </p>
            </form>
          </>
        }
      </DialogContent>
    </Dialog>);

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
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-charcoal">

        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-brand" />
      
    </div>);

}
