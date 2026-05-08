import Link from "next/link";

const footerLinks = {
  Services: ["Makeup", "Nails", "Eyelashes", "Facials", "Hair", "Spa & Body"],
  Shop: ["Skincare", "Makeup", "Gift Cards", "Bundles", "New Arrivals"],
  Company: ["Our Story", "The Team", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-[#070508] border-t border-[#1A1620]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="mb-6">
              <div
                className="text-3xl font-light tracking-[0.35em] text-[#F2ECE4] uppercase leading-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Pokaliz
              </div>
              <div
                className="-mt-1 text-lg font-light tracking-[0.65em] text-[#C9A55A] uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Laire
              </div>
            </div>
            <p
              className="text-xs text-[#554D60] leading-relaxed mb-8 max-w-xs"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              A luxury beauty experience designed for the modern woman. Premium services, curated products, expert care.
            </p>
            <div className="flex gap-5">
              {[
                { label: "IG", href: "#" },
                { label: "TK", href: "#" },
                { label: "FB", href: "#" },
                { label: "YT", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="font-sans text-[10px] tracking-widest text-[#2C2438] hover:text-[#C9A55A] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-[9px] tracking-[0.35em] uppercase text-[#C9A55A] mb-5"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-[#554D60] hover:text-[#F2ECE4] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-[#1A1620] p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4
                className="text-xl font-light text-[#F2ECE4] mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Beauty intelligence, delivered.
              </h4>
              <p
                className="text-xs text-[#554D60]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Early access to new services, exclusive offers, and beauty inspiration.
              </p>
            </div>
            <div className="flex gap-0 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent border border-[#2C2438] px-5 py-3 text-xs text-[#F2ECE4] placeholder:text-[#2C2438] focus:outline-none focus:border-[#C9A55A] transition-colors w-full md:w-64"
                style={{ fontFamily: "var(--font-manrope)" }}
              />
              <button
                className="bg-[#C9A55A] text-[#0D0B0E] px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[#E8C99A] transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-[#120F15]">
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-[#2C2438]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            © 2025 Pokaliz Laire. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.15em] text-[#2C2438]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Created by Frimpong Opoku Agyemang
          </p>
        </div>
      </div>
    </footer>
  );
}
