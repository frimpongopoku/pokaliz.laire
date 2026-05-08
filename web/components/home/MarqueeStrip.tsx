"use client";

const items = [
  "Luxury Beauty",
  "Expert Stylists",
  "Premium Services",
  "Bespoke Experiences",
  "Radiant Transformations",
  "Curated Products",
  "Flawless Results",
  "Beauty Elevated",
];

export function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[#1A1620] py-5 bg-[#08060A]">
      <div
        className={reverse ? "flex whitespace-nowrap" : "flex whitespace-nowrap marquee-track"}
        style={reverse ? { animation: "marquee 30s linear infinite reverse" } : {}}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="text-lg font-light italic text-[#2A2232] tracking-[0.15em] px-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {item}
            </span>
            <span className="text-[#C9A55A]/30 text-sm mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
