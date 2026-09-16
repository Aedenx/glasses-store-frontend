interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = "h-8 w-8" }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring — lens frame */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="white"
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Inner subtle ring */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="white"
        strokeWidth="0.75"
        opacity="0.25"
      />

      {/* Mountain / Apex — sharp geometric peak */}
      <path
        d="M10 32 L20 14 L24 20 L28 12 L38 32 Z"
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Mountain fill — subtle gradient effect via opacity layers */}
      <path
        d="M10 32 L20 14 L24 20 L28 12 L38 32 Z"
        fill="#10B981"
        opacity="0.15"
      />

      {/* Secondary peak fill */}
      <path
        d="M16 32 L24 18 L32 32 Z"
        fill="#10B981"
        opacity="0.1"
      />

      {/* Vision lens reflection — diagonal highlight */}
      <path
        d="M14 18 Q24 10, 34 18"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
      />

      {/* Center dot — focal point / pupil */}
      <circle
        cx="24"
        cy="22"
        r="2"
        fill="#10B981"
      />

      {/* Horizon line */}
      <line
        x1="10"
        y1="32"
        x2="38"
        y2="32"
        stroke="white"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
