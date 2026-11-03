"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const slides = [
  {
    src: "/media/slide-health.jpg",
    alt: "Illustration of a clinician reading a field of health signals",
    caption: "Health intelligence",
  },
  {
    src: "/media/slide-learn.jpg",
    alt: "Illustration of learners gathered around a laptop",
    caption: "Learning, together",
  },
  {
    src: "/media/slide-lab.jpg",
    alt: "Illustration of a laboratory tablet showing a cell model",
    caption: "From the lab to care",
  },
];

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
    }));

    let frame = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      if (!reduce) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > 1) node.vx *= -1;
          if (node.y < 0 || node.y > 1) node.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = (nodes[i].x - nodes[j].x) * width;
          const dy = (nodes[i].y - nodes[j].y) * height;
          const distance = Math.hypot(dx, dy);
          if (distance < 150) {
            context.strokeStyle = `rgba(141, 108, 228, ${(1 - distance / 150) * 0.55})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(nodes[i].x * width, nodes[i].y * height);
            context.lineTo(nodes[j].x * width, nodes[j].y * height);
            context.stroke();
          }
        }
      }
      for (const node of nodes) {
        context.fillStyle = "rgba(255, 255, 255, 0.9)";
        context.beginPath();
        context.arc(node.x * width, node.y * height, 2.4, 0, Math.PI * 2);
        context.fill();
      }
      if (!reduce) frame = window.requestAnimationFrame(draw);
    };
    draw();
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent_0%,transparent_42%,#000_68%)]"
      aria-hidden="true"
    />
  );
}

export function SplitText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setPlay(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref}>
      {words.map((word, index) => {
        const plain = word.toLowerCase().replace(/[^a-z-]/g, "");
        return (
          <span key={`${word}-${index}`} className="inline">
            <span
              className={`split-word inline-block ${play ? "split-play" : ""} ${plain === highlight ? "text-violet" : ""}`}
              style={{ animationDelay: play ? `${index * 70}ms` : undefined }}
            >
              {word}
            </span>
            {index < words.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </span>
  );
}

function cssSeconds(value: string) {
  const first = value.split(",")[0]?.trim() ?? "";
  if (first.endsWith("ms")) return (parseFloat(first) || 0) / 1000;
  return parseFloat(first) || 0;
}

export function PathLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawn = useRef(false);
  const [d, setD] = useState("");

  useEffect(() => {
    const svg = svgRef.current;
    const root = svg?.parentElement;
    if (!svg || !root) return;

    let timer = 0;
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const geometry = () => {
      const nodes = [...root.querySelectorAll<HTMLElement>("[data-step-node]")];
      if (nodes.length < 2 || window.innerWidth < 1024) return "";
      const box = svg.getBoundingClientRect();
      const pins = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - box.left,
          y: rect.top + rect.height / 2 - box.top,
          r: rect.width / 2,
        };
      });
      const direction = pins[1].x >= pins[0].x ? 1 : -1;
      let path = `M ${pins[0].x + direction * pins[0].r} ${pins[0].y}`;
      for (let index = 0; index < pins.length - 1; index += 1) {
        const from = pins[index];
        const to = pins[index + 1];
        const gutter = (from.x + to.x) / 2;
        const last = index === pins.length - 2;
        const endX = last ? to.x - direction * to.r : to.x + direction * to.r;
        path += ` H ${gutter} V ${to.y} H ${endX}`;
      }
      return path;
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (window.innerWidth < 1024) {
        setD("");
        return;
      }
      const cards = [...root.querySelectorAll<HTMLElement>(".rise")];
      const settled = cards.length === 0 || cards.every((card) => card.classList.contains("rise-in"));
      if (!settled) return;

      const wait = drawn.current || reduced() || cards.length === 0
        ? 0
        : Math.max(
            0,
            ...cards.map((card) => {
              const style = getComputedStyle(card);
              return (cssSeconds(style.transitionDelay) + cssSeconds(style.transitionDuration)) * 1000;
            }),
          );

      timer = window.setTimeout(() => setD(geometry()), wait + 40);
    };

    schedule();
    const mutations = new MutationObserver(schedule);
    root.querySelectorAll(".rise").forEach((card) => {
      mutations.observe(card, { attributes: true, attributeFilter: ["class"] });
    });
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("resize", schedule);
    return () => {
      mutations.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !d) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || drawn.current) {
      path.style.transition = "none";
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      drawn.current = true;
      return;
    }
    const length = path.getTotalLength();
    path.style.transition = "none";
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const frame = requestAnimationFrame(() => {
      drawn.current = true;
      path.style.transition = "stroke-dashoffset 1.15s cubic-bezier(0.22, 0.8, 0.28, 1)";
      path.style.strokeDashoffset = "0";
    });
    return () => cancelAnimationFrame(frame);
  }, [d]);

  return (
    <svg ref={svgRef} className="pointer-events-none absolute -top-16 left-0 z-10 hidden h-[calc(100%+4rem)] w-full overflow-visible lg:block" aria-hidden="true">
      <path ref={pathRef} d={d} fill="none" stroke="#8D6CE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSlideshow({ bleed = false }: { bleed?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={bleed ? "absolute inset-0" : "relative h-80 overflow-hidden rounded-[1.75rem] sm:h-[26rem]"}>
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={slideIndex === 0}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className={`ken-in object-cover transition-opacity duration-1000 ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {bleed ? null : <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />}
      <div className={bleed ? "absolute bottom-6 right-8 z-20 flex gap-1.5" : "absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3"}>
        {bleed ? null : (
        <p className="font-display text-sm font-medium text-white">
          {slides[index].caption}
        </p>
        )}
        <div className="flex gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show image ${slideIndex + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === index ? "w-6 bg-violet" : "w-1.5 bg-white/70"
              }`}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rise ${visible ? "rise-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`group/photo relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover/photo:scale-110"
      />
    </div>
  );
}
