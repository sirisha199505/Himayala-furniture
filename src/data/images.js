/**
 * Image helpers. We hotlink Unsplash + the existing site's CDN (zyrosite).
 * `img()` returns an optimized Unsplash URL for a given photo id.
 */

export function img(id, w = 1200, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

// Real product photos pulled from himalayanfurnituremart.in (zyrosite CDN)
export const REAL = {
  p1: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=1121,fit=crop/LCbkQflvzpboJC3e/whatsapp-image-2026-05-13-at-12.52.02-pm-16-m5WeAZ5XvCGFEPGs.jpeg",
  p2: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=1000,fit=crop/LCbkQflvzpboJC3e/whatsapp-image-2026-05-13-at-1.06.17-pm-kdQINjWIjBdO8uBc.jpeg",
  p3: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=1124,fit=crop/LCbkQflvzpboJC3e/whatsapp-image-2026-05-13-at-12.52.02-pm-3-fOSLaFyCmxWstypW.jpeg",
  p4: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=845,fit=crop/LCbkQflvzpboJC3e/whatsapp-image-2026-05-13-at-12.54.18-pm-Q79bvpXZBE7bjFx3.jpeg"
};

// Curated furniture imagery (Unsplash photo ids) grouped by use.
export const POOL = {
  sofas: ["1555041469-a586c61ea9bc", "1567538096630-e0c55bd6374c", "1493663284031-b7e3aefcae8e", "1493244040629-496f6d136cc3"],
  beds: ["1505693416388-ac5ce068fe85", "1540574163026-643ea20ade25", "1522771739844-6a9f6d5f14af", "1616594039964-ae9021a400a0"],
  dining: ["1617806118233-18e1de247200", "1556228453-efd6c1ff04f6", "1615874959474-d609969a20ed", "1604578762246-41134e37f9cc"],
  office: ["1524758631624-e2822e304c36", "1497366216548-37526070297c", "1497366811353-6870744d04b2", "1593062096033-9a26b09da705"],
  chairs: ["1598300042247-d088f8ab3a91", "1567016432779-094069958ea5", "1506439773649-6e0eb8cfb237", "1519947486511-46149fa0a254"],
  wardrobes: ["1595428774223-ef52624120d2", "1558997519-83ea9252edf8", "1631679706909-1844bbd07221", "1616627561950-9f746e330187"],
  storage: ["1503602642458-232111445657", "1538688525198-9b88f6f53126", "1594026112284-02bb6f3352fe", "1532372320572-cda25653a26d"],
  living: ["1586024486164-ce9b3d87e09f", "1553098455-d1392a0428d0", "1528208079124-a2387f039c99", "1602990721338-9cbb5b983c4d"],
  hero: ["1618220179428-22790b461013", "1616486338812-3dadae4b4ace", "1567767292278-a4f21aa2d36e"],
  gallery: [
  "1586024486164-ce9b3d87e09f", "1553098455-d1392a0428d0", "1528208079124-a2387f039c99",
  "1675848311787-d2706fce4aed", "1688578735427-994ecdea3ea4", "1602990721338-9cbb5b983c4d",
  "1659930087003-2d64e33181f7", "1618220179428-22790b461013", "1616486338812-3dadae4b4ace",
  "1567767292278-a4f21aa2d36e", "1567538096630-e0c55bd6374c", "1540574163026-643ea20ade25"]

};
