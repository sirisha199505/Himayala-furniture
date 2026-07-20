"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

const DialogContent = React.forwardRef(

  ({ className, children, hideClose, overlayClassName, ...props }, ref) =>
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[100] bg-charcoal/70 backdrop-blur-sm data-[state=open]:animate-[fadeIn_0.25s_ease] data-[state=closed]:animate-[fadeOut_0.2s_ease]",
        overlayClassName
      )} />
    
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-[101] max-h-[90dvh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-surface p-6 shadow-elevated focus:outline-none data-[state=open]:animate-[popIn_0.3s_cubic-bezier(0.22,1,0.36,1)]",
        className
      )}
      {...props}>
      
      {children}
      {!hideClose &&
      <DialogPrimitive.Close className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-beige text-charcoal transition-colors hover:bg-brand hover:text-white focus:outline-none">
          <X size={18} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      }
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
DialogContent.displayName = "DialogContent";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription };
