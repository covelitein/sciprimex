type MarkProps = {
  className?: string;
  title?: string;
  variant?: "color" | "mono";
};

const SHAPE =
  "M1176 322.7L1159.5 343L1133.6 311.8L1104.6 311.8L1145.7 360.6L1104.6 412.7L1123.4 412.7L1159.6 378L1176 398.4L1146.2 427.2L1067 427.2L1115.4 360.6L1067.1 297L1159.6 297L1176 311.8Z";

const STROKE = "M1110.9 409.8L1121.5 409.8L1176 357.5L1176 328.8Z";

export function Mark({ className, title, variant = "color" }: MarkProps) {
  const labeled = Boolean(title);

  return (
    <svg
      viewBox="1067 297 109 130.2"
      className={className}
      role={labeled ? "img" : undefined}
      aria-hidden={labeled ? undefined : true}
      aria-label={title}
    >
      {variant === "mono" ? (
        <path fill="currentColor" fillRule="evenodd" d={`${SHAPE}${STROKE}`} />
      ) : (
        <>
          <path fill="#8D6CE4" d={SHAPE} />
          <path fill="#FFFFFF" d={STROKE} />
        </>
      )}
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  variant?: "color" | "mono";
};

export function Wordmark({ className = "", variant = "color" }: WordmarkProps) {
  const prime = variant === "color" ? "text-violet" : "";
  const slash = variant === "color" ? "text-violet" : "";

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-display font-semibold leading-none ${className}`}
    >
      <span>Sci</span>
      <span className={prime}>Prime</span>
      <span className="relative">
        X
        {variant === "color" ? (
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${slash} [clip-path:polygon(46%_-8%,112%_-8%,58%_108%,-8%_108%)]`}
          >
            X
          </span>
        ) : null}
      </span>
    </span>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  variant?: "color" | "mono";
};

export function Logo({
  className = "",
  markClassName = "h-8 w-auto",
  wordClassName = "text-[1.35rem]",
  variant = "color",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className={markClassName} variant={variant} />
      <Wordmark className={wordClassName} variant={variant} />
    </span>
  );
}
