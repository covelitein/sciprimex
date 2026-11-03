"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/logo";

type Item = { href: string; label: string; detail: string };

const company: Item[] = [
  { href: "#company", label: "About", detail: "Germany, Nigeria, and the mission" },
  { href: "#capabilities", label: "Solutions", detail: "Shared research and technology" },
];

const divisions: Item[] = [
  { href: "#health", label: "SciPrimeX Health", detail: "Predictive care and digital health" },
  { href: "#education", label: "SciPrimeX Education", detail: "Campus and Academy" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(null);
        setOpen(false);
      }
    }
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  function closeAll() {
    setMenu(null);
    setOpen(false);
  }

  return (
    <header ref={rootRef} className="sticky top-3 z-40 mb-4 px-3 sm:top-4 sm:px-6 lg:px-9">
        <div
        className={`mx-auto border border-white/10 bg-ink px-3 transition-[border-radius] duration-300 ease-out motion-reduce:transition-none ${
          open ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 pl-3">
          <a href="#top" className="shrink-0 text-white" aria-label="SciPrimeX, home" onClick={closeAll}>
            <Logo markClassName="h-7 w-auto" wordClassName="text-[1.15rem]" />
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            <a href="#top" aria-current="page" className="nav-line rounded-full px-3 py-2 font-sans text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">
              Home
            </a>
            <Dropdown
              label="Company"
              items={company}
              open={menu === "company"}
              onOpen={() => setMenu("company")}
              onClose={() => setMenu(null)}
              onNavigate={closeAll}
            />
            <Dropdown
              label="Divisions"
              items={divisions}
              open={menu === "divisions"}
              onOpen={() => setMenu("divisions")}
              onClose={() => setMenu(null)}
              onNavigate={closeAll}
            />
            <a href="#teams" className="nav-line rounded-full px-3 py-2 font-sans text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">
              Our teams
            </a>
            <a href="#path" className="nav-line rounded-full px-3 py-2 font-sans text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-full bg-violet px-4 font-display text-sm font-medium text-navy lg:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.8,0.28,1)] motion-reduce:transition-none lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav
            id="mobile-nav"
            className="overflow-hidden"
            aria-label="Primary"
            inert={!open}
          >
            <div className="border-t border-white/10 px-3 py-3">
              <MobileLink href="#top" label="Home" open={open} index={0} onNavigate={closeAll} />
              <MobileGroup label="Company" items={company} open={open} index={1} onNavigate={closeAll} />
              <MobileGroup label="Divisions" items={divisions} open={open} index={2} onNavigate={closeAll} />
              <MobileLink href="#teams" label="Our teams" open={open} index={3} onNavigate={closeAll} />
              <MobileLink href="#path" label="How it works" open={open} index={4} onNavigate={closeAll} />
              <a
                href="#contact"
                className={`mt-2 inline-flex h-11 items-center rounded-full bg-violet px-5 font-sans text-sm font-medium text-navy transition duration-300 ease-out motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? "240ms" : "0ms" }}
                onClick={closeAll}
              >
                Get in touch
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Dropdown({
  label,
  items,
  open,
  onOpen,
  onClose,
  onNavigate,
}: {
  label: string;
  items: Item[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="nav-line inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <Chevron open={open} />
      </button>
      {open ? (
        <div id={panelId} className="absolute left-0 top-full z-50 w-72 pt-3">
          <ul className="rounded-3xl border border-white/10 bg-navy p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 hover:bg-white/5"
                  onClick={onNavigate}
                >
                  <span className="block font-sans text-sm font-medium text-white">{item.label}</span>
                  <span className="mt-1 block font-sans text-xs leading-5 text-cool">{item.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MobileLink({
  href,
  label,
  open,
  index,
  onNavigate,
}: {
  href: string;
  label: string;
  open: boolean;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      className={`block rounded-2xl px-3 py-3 font-sans text-base text-white transition duration-300 ease-out motion-reduce:transition-none ${
        index > 0 ? "border-t border-white/10" : ""
      } ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      style={{ transitionDelay: open ? `${80 + index * 40}ms` : "0ms" }}
      onClick={onNavigate}
    >
      {label}
    </a>
  );
}

function MobileGroup({
  label,
  items,
  open: shown,
  index,
  onNavigate,
}: {
  label: string;
  items: Item[];
  open: boolean;
  index: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!shown) setExpanded(false);
  }, [shown]);

  return (
    <div
      className={`border-t border-white/10 transition duration-300 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${80 + index * 40}ms` : "0ms" }}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-2xl px-3 py-3 font-sans text-base text-white"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {label}
        <Chevron open={expanded} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="overflow-hidden" inert={!expanded}>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="block rounded-2xl px-3 py-2 pl-6 font-sans text-sm text-cool" onClick={onNavigate}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
      <span
        className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "top-[6px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] block h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "top-[6px] -rotate-45" : "top-3"
        }`}
      />
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 6.5 8 10.5 12 6.5" />
    </svg>
  );
}
