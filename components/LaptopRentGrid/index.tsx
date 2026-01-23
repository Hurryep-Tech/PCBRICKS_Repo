import React from "react";
import { motion, Variants } from "framer-motion";

const cards: BrandCardProps[] = [
  {
    brand: "Lenovo",
    img: "/products/lenovo.png",
    specs: {
      processor: "Intel i3, i5, i7, i9",
      ram: "8GB, 16GB, 32GB",
      ssd: "256GB, 512GB, 1TB, 2TB",
      display: "13–16 inch",
      resolutions: "1080p FHD, 2K, 4K",
      os: "Windows 11 Pro",
    },
  },
  {
    brand: "Dell",
    img: "/products/dell.png",
    specs: {
      processor: "Intel i3, i5, i7, i9",
      ram: "8GB, 16GB, 32GB",
      ssd: "256GB, 512GB, 1TB, 2TB",
      display: "13–16 inch",
      resolutions: "1080p FHD, 2K, 4K",
      os: "Windows 11 Pro",
    },
  },
  {
    brand: "HP",
    img: "/products/hp.png",
    specs: {
      processor: "Intel i3, i5, i7, i9",
      ram: "8GB, 16GB, 32GB",
      ssd: "256GB, 512GB, 1TB, 2TB",
      display: "13–16 inch",
      resolutions: "1080p FHD, 2K, 4K",
      os: "Windows 11 Pro",
    },
  },
  {
    brand: "Asus",
    img: "/products/asus.png",
    specs: {
      processor: "Intel i3, i5, i7, i9",
      ram: "8GB, 16GB, 32GB",
      ssd: "256GB, 512GB, 1TB, 2TB",
      display: "13–16 inch",
      resolutions: "1080p FHD, 2K, 4K",
      os: "Windows 11 Pro",
    },
  },
];

type Specs = {
  processor: string;
  ram: string;
  ssd: string;
  display: string;
  resolutions: string;
  os: string;
};

export type BrandCardProps = {
  brand: "Lenovo" | "Dell" | "HP" | "Asus" | (string & {});
  img: string; // SVG/PNG URL
  imgAlt?: string;
  specs: Specs;
  ctaHref?: string;
  ctaText?: string;
  onContact?: () => void;
};

type LaptopRentGridProps = {
  onContact: () => void;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 18, mass: 0.7 },
  },
};

const LaptopRentGrid: React.FC<LaptopRentGridProps> = ({ onContact }) => {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      aria-labelledby="laptop-rental-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Heading */}
        <div className="mx-auto max-w-6xl text-center">
          <h2
            id="laptop-rental-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Rent Branded Laptops — Lenovo, Dell, HP & Asus
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Flexible laptop rentals with premium configurations — Intel i3–i9
            processors, SSD storage, Windows 11 Pro. Perfect for teams, events,
            and short-term projects.
          </p>
        </div>

        {/* Cards */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((item) => (
            <motion.li key={item.brand} variants={card}>
              <BrandCard {...item} onContact={onContact} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

const Check: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5 shrink-0 text-sky-100"
  >
    <circle cx="12" cy="12" r="11" className="fill-sky-600" />
    <path
      d="M7 12.5l3 3L18 8.5"
      className="stroke-sky-100"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const SpecRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <li className="flex items-start gap-3">
    <Check />
    <div className="text-[15px] leading-6">
      <span className="font-semibold text-slate-800">{label} </span>
      <span className="text-slate-600">{value}</span>
    </div>
  </li>
);

const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  img,
  imgAlt,
  specs,
  ctaHref = "#contact",
  ctaText = "Contact us",
  onContact,
}) => {
  return (
    <div
      className={[
        "group relative flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/90",
        "shadow-[0_1px_0_0_rgba(15,23,42,0.04)] backdrop-blur",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5",
        "focus-within:ring-2 focus-within:ring-sky-400",
      ].join(" ")}
    >
      {/* glossy edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"
      />

      {/* brand image */}
      <div className="px-8 pt-8">
        <div className="relative mx-auto flex h-44 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/70">
          {/* shine sweep on hover */}
          <span
            aria-hidden
            className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <img
            src={img}
            alt={imgAlt ?? `${brand} logo`}
            className="max-h-28 object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* specs */}
      <div className="flex grow flex-col px-8 pb-6 pt-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {brand} Laptops
        </h3>

        <ul className="mt-3 space-y-3">
          <SpecRow label="Processor:" value={specs.processor} />
          <SpecRow label="RAM:" value={specs.ram} />
          <SpecRow label="SSD Storage:" value={specs.ssd} />
          <SpecRow label="Display:" value={specs.display} />
          <SpecRow label="Resolutions:" value={specs.resolutions} />
          <SpecRow label="OS:" value={specs.os} />
        </ul>

        {/* CTA */}
        <div className="mt-5">
          <button
            onClick={onContact}
            className={[
              "relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-5 py-3",
              "font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400",
              "bg-[#2563eb]",
              "transition-all duration-300 ease-out",
              "hover:brightness-105 active:scale-[0.99]",
            ].join(" ")}
          >
            {/* button shine */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-y-[-140%] bg-white/20 blur-sm transition-transform duration-700 ease-out group-hover:translate-y-[-10%]"
            />
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopRentGrid;
