import { Header } from "@/components/header";
import { Wordmark } from "@/components/logo";
import { HeroSlideshow, ParticleField, PathLine, Photo, Reveal, SplitText } from "@/components/visuals";

const stages = [
  {
    step: "01",
    name: "Research",
    line: "Turn data into knowledge.",
    text: "Collect, analyze, and interpret scientific evidence until the insight is solid enough to build on.",
    image: "/media/ill-research.jpg",
    alt: "Illustration of a researcher reading a field of charts",
  },
  {
    step: "02",
    name: "Innovation",
    line: "Turn knowledge into products.",
    text: "Design AI platforms, digital tools, and embedded systems that can leave the lab.",
    image: "/media/ill-systems.jpg",
    alt: "Illustration of a wearable device opened to its circuitry",
  },
  {
    step: "03",
    name: "Impact",
    line: "Put the work into the world.",
    text: "Deliver scalable tools for classrooms, clinics, and the communities around them.",
    image: "/media/ill-care.jpg",
    alt: "Illustration of a clinician reviewing care on a tablet",
  },
];

const reasons = [
  "Sector-agile, with the right team for the work",
  "Scientifically rigorous, technically robust, human-centered",
  "Built for health, education, and what comes next",
  "Based in Siegen, with a studio in Port Harcourt",
];

const capabilities = [
  ["AI technology", "Generative AI, neurosymbolic reasoning, multimodal models, and edge intelligence.", "/media/ill-ai.jpg", "Illustration of a neural network"],
  ["Research", "Academic collaborations, feasibility studies, and grant coordination.", "/media/photo-lab.jpg", "A scientist at work in a laboratory"],
  ["Genomics", "Biomedical informatics and analysis for precision health.", "/media/ill-genomics.jpg", "Illustration of a microscope beside a DNA helix"],
  ["Public health", "Epidemiological modeling and health-system design.", "/media/slide-health.jpg", "Illustration of health signals gathered into a network"],
  ["Embedded systems", "Sensors, wearables, and IoT built into practical products.", "/media/ill-systems.jpg", "Illustration of a wearable opened to its circuitry"],
  ["Learning", "Interactive paths that prepare people for the future of work.", "/media/slide-learn.jpg", "Illustration of a study group around a laptop"],
];

const finds = [
  { href: "#health", label: "Health" },
  { href: "#education", label: "Education" },
  { href: "#capabilities", label: "Capabilities" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="px-3 pb-10 sm:px-4">
        <section className="mx-auto mt-4 sm:mt-6 lg:px-6">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-navy lg:min-h-[36rem]">
            <HeroSlideshow bleed />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
            <ParticleField />
            <div className="relative z-10 flex min-h-[34rem] max-w-xl flex-col justify-center px-5 py-12 sm:px-12 lg:min-h-[36rem]">
              <p className="font-display text-sm font-medium text-violet">Science-first technology</p>
              <h1 className="mt-4 max-w-xl font-flex text-4xl font-semibold leading-[1.08] text-white sm:text-6xl">
                <SplitText text="Turning research into real-world solutions." highlight="real-world" />
              </h1>
              <p className="enter mt-5 max-w-lg font-display text-base leading-7 text-cool sm:text-lg">
                AI-powered systems for health, education, and emerging fields. SciPrimeX takes validated science out of the paper and into products people can use.
              </p>
              <div className="enter-late mt-8">
                <p className="font-flex text-sm text-cool">I&apos;m looking for</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {finds.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex h-11 w-full items-center justify-between gap-2 rounded-full bg-violet px-5 font-display text-sm font-medium text-navy sm:w-auto sm:justify-center"
                    >
                      {item.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4">
        <section id="path" className="mx-auto mt-16 max-w-6xl">
          <div className="text-center">
            <p className="font-flex text-sm font-medium text-violet">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
              <SplitText text="From research to a product people use." />
            </h2>
          </div>
          <div className="relative mt-14">
            <PathLine />
            <div className="grid items-start gap-8 lg:grid-cols-3">
              {stages.map((stage, index) => (
                <Reveal key={stage.step} delay={index * 140} className={index === 1 ? "lg:mt-16" : index === 2 ? "lg:mt-32" : ""}>
                  <article className={`relative rounded-[2rem] px-6 pt-16 pb-7 sm:px-7 ${index === 1 ? "bg-violet text-navy" : "border border-white/10 bg-ink text-white"}`}>
                    <div
                      data-step-node
                      className={`absolute -top-12 left-1/2 z-20 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 ${index === 1 ? "border-navy" : "border-violet"}`}
                    >
                      <Photo src={stage.image} alt={stage.alt} className="h-full w-full rounded-full" />
                    </div>
                    <span className={`font-display text-5xl font-semibold leading-none ${index === 1 ? "text-navy/25" : "text-violet/70"}`}>{stage.step}</span>
                    <h3 className={`mt-4 font-display text-2xl font-semibold ${index === 1 ? "text-navy" : "text-white"}`}>{stage.name}</h3>
                    <p className={`mt-2 font-flex text-base font-medium ${index === 1 ? "text-navy" : "text-white"}`}>{stage.line}</p>
                    <p className={`mt-3 font-display text-sm leading-6 ${index === 1 ? "text-navy/80" : "text-cool"}`}>{stage.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="divisions" className="mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-display text-sm font-medium text-violet">Divisions</p>
              <h2 className="mt-3 font-flex text-3xl font-semibold text-white sm:text-5xl">
                <SplitText text="Two platforms. One standard." />
              </h2>
            </div>
            <p className="max-w-sm font-display text-sm leading-6 text-cool">
              Headquartered in Germany, with work on the ground in Nigeria.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article id="education" className="lift flex h-full flex-col overflow-hidden rounded-[2rem] bg-violet text-navy">
              <Photo src="/media/photo-learners.jpg" alt="Three people working together at a table with laptops" className="h-64" />
              <div className="p-7 sm:p-9">
              <p className="font-flex text-sm font-medium">SciPrimeX Education</p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
                <SplitText text="Empowering learning, everywhere." />
              </h3>
              <p className="mt-4 font-flex text-base leading-7">
                Campus is the learning platform. Academy adds curricula, lab kits, and training in AI, robotics, and embedded systems, with mentorship for early-career researchers.
              </p>
              <ul className="mt-6 flex flex-col gap-2 font-display text-sm font-medium">
                <li>Real-time progress tracking</li>
                <li>Learning paths that adapt</li>
                <li>Interactive lessons and assessments</li>
              </ul>
              <p className="mt-6 font-flex text-sm leading-6">
                For public university students, primary healthcare workers, and early-career professionals, starting in Nigeria.
              </p>
              </div>
            </article>
            <article id="health" className="lift flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ink">
              <Photo src="/media/slide-lab.jpg" alt="Illustration of a laboratory tablet showing a cell model" className="h-64" />
              <div className="p-7 sm:p-9">
              <p className="font-display text-sm font-medium text-violet">SciPrimeX Health</p>
              <h3 className="mt-3 font-flex text-3xl font-semibold leading-tight text-white">
                <SplitText text="Predictive science for smarter healthcare." />
              </h3>
              <p className="mt-4 font-display text-base leading-7 text-cool">
                From data to care. AI, genomics, and wearables for predictive and personalized medicine.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-navy p-4">
                  <h4 className="font-flex text-base font-semibold text-white">Germany and the EU</h4>
                  <p className="mt-2 font-display text-sm leading-6 text-cool">
                    University hospitals and AI labs, including the University of Siegen, plus wearable monitoring.
                  </p>
                </div>
                <div className="rounded-2xl bg-navy p-4">
                  <h4 className="font-display text-base font-semibold text-white">Nigeria and Africa</h4>
                  <p className="mt-2 font-flex text-sm leading-6 text-cool">
                    Affordable digital health with local institutions and NGOs, including remote monitoring.
                  </p>
                </div>
              </div>
              </div>
            </article>
          </div>
        </section>

        <section id="capabilities" className="mx-auto mt-20 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-flex text-sm font-medium text-violet">Solutions</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
                <SplitText text="The capabilities behind both divisions." />
              </h2>
            </div>
            <div>
              {capabilities.map(([name, text, image, alt], index) => (
                <Reveal key={name} delay={index * 70}>
                  <article className="grid grid-cols-[4.25rem_1fr] items-center gap-4 border-t border-white/10 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
                    <Photo src={image} alt={alt} className="h-16 w-full rounded-2xl sm:h-24" />
                    <div>
                      <h3 className="font-flex text-xl font-semibold text-white">{name}</h3>
                      <p className="mt-1 font-display text-sm leading-6 text-cool">{text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="company" className="mx-auto mt-16 grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Photo
            src="/media/photo-talk.jpg"
            alt="Two colleagues reviewing code together in a studio"
            className="min-h-80 rounded-[2rem]"
          />
          <div id="teams" className="rounded-[2rem] border border-white/10 bg-ink p-7 sm:p-9">
            <p className="font-display text-sm font-medium text-violet">Why SciPrimeX</p>
            <h2 className="mt-3 font-flex text-3xl font-semibold text-white">
              <SplitText text="Rigorous platforms, built for people." />
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 font-display text-base leading-7 text-white">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet" />
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-flex text-sm leading-6 text-cool">
              Students, innovators, and volunteers are welcome on digital health, AI, and education projects.
            </p>
          </div>
        </section>

        <section className="relative mx-auto mt-16 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center">
          <div className="absolute inset-0">
            <Photo src="/media/photo-campus.jpg" alt="" className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-navy/80" />
          <div className="relative">
          <p className="font-flex text-sm font-medium text-violet">Built toward</p>
          <p className="mt-3 font-display text-6xl font-semibold text-white sm:text-7xl">1,000+</p>
          <p className="mt-3 font-flex text-lg text-cool">Learners and innovators, aimed for by 2026</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Siegen", "Port Harcourt", "University of Siegen"].map((place) => (
              <span key={place} className="rounded-full border border-white/10 px-4 py-2 font-display text-sm text-white">
                {place}
              </span>
            ))}
          </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-6 max-w-6xl rounded-[2rem] bg-violet px-6 py-12 text-navy sm:px-10 sm:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-sm font-medium">Contact</p>
              <h2 className="mt-3 font-flex text-4xl font-semibold leading-tight">
                <SplitText text="Start a conversation with SciPrimeX." />
              </h2>
              <div className="mt-6 grid gap-4 font-display text-sm leading-6 sm:grid-cols-2">
                <p>
                  8 Hagedornweg
                  <br />
                  57076 Siegen, Germany
                </p>
                <p>
                  11 Woji New Layout Street
                  <br />
                  Port Harcourt, Nigeria
                </p>
              </div>
            </div>
            <a
              href="mailto:enquiries@sciprimex.com"
              className="inline-flex h-12 shrink-0 items-center rounded-full bg-navy px-6 font-flex text-sm font-medium text-white"
            >
              enquiries@sciprimex.com
            </a>
          </div>
        </section>
        </div>
      </main>
      <footer className="px-7 pb-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="text-lg text-white" />
          <p className="font-flex text-sm text-cool">Siegen · Port Harcourt</p>
        </div>
      </footer>
    </>
  );
}
