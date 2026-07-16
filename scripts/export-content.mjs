// Export storefront content from the static src/data files to JSON for the
// backend to import into the DB (so the site is unchanged at cutover, then
// admin-managed). Top-level keys are converted to snake_case to match DB
// columns. Run from the UI root:
//   node.exe --experimental-default-type=module --experimental-loader ./scripts/_extless-loader.mjs scripts/export-content.mjs
import { writeFileSync } from "node:fs";
import { categories } from "../src/data/categories.js";
import { blogPosts } from "../src/data/blog.js";
import { caseStudies } from "../src/data/caseStudies.js";
import { stories } from "../src/data/stories.js";
import { galleryItems } from "../src/data/gallery.js";
import { faqs } from "../src/data/faqs.js";

const API = "../Himalayan-Mart-api/Himalayan-api/scripts";
const snakeKey = (k) => k.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());

// Convert only TOP-LEVEL keys (nested jsonb values stay as-is). Optionally drop
// keys and inject defaults.
function rows(list, { drop = [], defaults = {} } = {}) {
  return list.map((o) => {
    const out = { ...defaults };
    for (const [k, v] of Object.entries(o)) {
      if (drop.includes(k)) continue;
      out[snakeKey(k)] = v;
    }
    return out;
  });
}

function write(name, data) {
  writeFileSync(`${API}/${name}.json`, JSON.stringify(data, null, 2));
  console.log(`wrote ${name}.json (${data.length})`);
}

write("categories", rows(categories));
write("blogs", rows(blogPosts, { defaults: { images: [] } }));
write("case-studies", rows(caseStudies, { defaults: { images: [] } }));
write("stories", rows(stories, { defaults: { images: [] } }));
write("gallery", rows(galleryItems, { drop: ["id"], defaults: { images: [] } }));
write("faqs", rows(faqs, { drop: ["id"] }));
