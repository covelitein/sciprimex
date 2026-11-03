export function Atmosphere() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="atmosphere-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <g filter="url(#atmosphere-blur)" opacity="0.55">
        <path
          d="M-80 180C220 40 520 340 1520 80"
          fill="none"
          stroke="#8D6CE4"
          strokeWidth="90"
          opacity="0.28"
        />
        <path
          d="M-120 760C380 520 860 980 1560 640"
          fill="none"
          stroke="#8D6CE4"
          strokeWidth="120"
          opacity="0.16"
        />
      </g>
    </svg>
  );
}

const SHAPE =
  "M1176 322.7L1159.5 343L1133.6 311.8L1104.6 311.8L1145.7 360.6L1104.6 412.7L1123.4 412.7L1159.6 378L1176 398.4L1146.2 427.2L1067 427.2L1115.4 360.6L1067.1 297L1159.6 297L1176 311.8Z";

export function MarkField({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id="mark-field"
          width="120"
          height="146"
          patternUnits="userSpaceOnUse"
        >
          <g
            transform="translate(18 16) scale(0.42) translate(-1067 -297)"
            fill="#8D6CE4"
            fillOpacity="0.11"
          >
            <path d={SHAPE} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mark-field)" />
    </svg>
  );
}
