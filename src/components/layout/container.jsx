import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Tag = "div",
  ...props
}) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12", className)}
      {...props} />);

}
