import type { ReactNode } from 'react'

interface Props {
  id: string
  kicker: string
  title: string
  aside?: ReactNode
}

/** Reference heading: red double-rule kicker over a heavy condensed title. */
export default function SectionHeading({ id, kicker, title, aside }: Props) {
  return (
    <div className="sec-head">
      <div className="reveal">
        <p className="sec-kicker">
          <span className="sec-rule" aria-hidden />
          {kicker}
        </p>
        <h2 id={id} className="sec-title" data-text={title}>
          {title}
        </h2>
      </div>
      {aside && (
        <div className="sec-aside reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
          {aside}
        </div>
      )}
    </div>
  )
}
