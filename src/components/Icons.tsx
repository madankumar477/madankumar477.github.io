import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const

export const PlayIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
  </svg>
)
export const DownloadIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" />
  </svg>
)
export const InfoIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M12 11v6M12 7.5v.01" />
  </svg>
)
export const ArrowUpRight = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)
export const ChevronLeft = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)
export const ChevronRight = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)
export const ChevronDown = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 9l7 7 7-7" />
  </svg>
)
export const CloseIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const ReplayIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5" />
  </svg>
)
export const MenuIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const GithubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"
    />
  </svg>
)
export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />
  </svg>
)
export const MailIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
)
export const LockIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)
export const ScanIcon = (p: P) => (
  <svg {...base} stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" />
  </svg>
)
export const Laurel = (p: P) => (
  <svg viewBox="0 0 64 40" fill="none" aria-hidden {...p}>
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M22 36C10 32 5 22 7 8" />
      <path d="M42 36c12-4 17-14 15-28" />
    </g>
    <g fill="currentColor">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <ellipse cx={8 + i * 1.6} cy={10 + i * 5.5} rx="2.2" ry="4.2" transform={`rotate(${-40 + i * 8} ${8 + i * 1.6} ${10 + i * 5.5})`} />
          <ellipse cx={56 - i * 1.6} cy={10 + i * 5.5} rx="2.2" ry="4.2" transform={`rotate(${40 - i * 8} ${56 - i * 1.6} ${10 + i * 5.5})`} />
        </g>
      ))}
    </g>
  </svg>
)

export const BrandMark = ({ className }: { className?: string }) => (
  <span className={`brand ${className ?? ''}`} aria-label="Madan series">
    <svg viewBox="0 0 64 64" aria-hidden className="brand-m">
      <path d="M8 58V6h12l12 24L44 6h12v52H45V27l-9.5 18h-7L19 27v31z" fill="currentColor" />
    </svg>
    <span className="brand-word">SERIES</span>
  </span>
)
