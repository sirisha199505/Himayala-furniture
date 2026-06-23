import * as React from "react";

/**
 * Lightweight renderer for our simple markdown-ish content:
 * supports `## headings`, `- bullets`, `**bold**` and paragraphs.
 */
export function Prose({ content }) {
  const blocks = content.trim().split(/\n\n+/);
  return (
    <div className="space-y-5 text-pretty text-[1.05rem] leading-[1.8] text-warmbrown/90">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="!mt-10 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
              
              {trimmed.slice(3)}
            </h2>);

        }
        if (/^- /m.test(trimmed)) {
          const items = trimmed.split(/\n/).map((l) => l.replace(/^- /, ""));
          return (
            <ul key={i} className="space-y-2 pl-1">
              {items.map((it, j) =>
              <li key={j} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{renderInline(it)}</span>
                </li>
              )}
            </ul>);

        }
        return <p key={i}>{renderInline(trimmed)}</p>;
      })}
    </div>);

}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
  p.startsWith("**") && p.endsWith("**") ?
  <strong key={i} className="font-semibold text-charcoal">
        {p.slice(2, -2)}
      </strong> :

  <React.Fragment key={i}>{p}</React.Fragment>

  );
}
