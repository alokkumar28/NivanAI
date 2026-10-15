export default function NivanIcon({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nivan AI"
      role="img"
    >
      <defs>
        <linearGradient id="nivan-gradient" x1="7" y1="5" x2="33" y2="35">
          <stop stopColor="#C4B5FD" />
          <stop offset=".48" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill="#13131D"
        stroke="#272735"
      />

      <path
        d="M10 29V11.5C10 10.1 11.8 9.5 12.7 10.7L27.3 29.3C28.2 30.5 30 29.9 30 28.5V16"
        stroke="url(#nivan-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M30 7.5L31 10.5L34 11.5L31 12.5L30 15.5L29 12.5L26 11.5L29 10.5Z"
        fill="#C4B5FD"
      />
    </svg>
  );
}
