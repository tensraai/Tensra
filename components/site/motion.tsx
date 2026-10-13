'use client'

import { useRef } from 'react'
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </m.div>
  )
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
}

export function StaggerList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.ul
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </m.ul>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.li className={cn('h-full', className)} variants={staggerChild}>
      {children}
    </m.li>
  )
}

export function HeroSequence({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
    >
      {children}
    </m.div>
  )
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </m.div>
  )
}

export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </m.span>
        </span>
      ))}
    </span>
  )
}

export function FloatIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale: 0.94, rotateX: 10, y: 40 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </m.div>
  )
}

/** Pointer-tracked glow. Writes CSS variables directly so hovering never triggers a React render. */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div ref={ref} onPointerMove={onPointerMove} className={cn('spotlight h-full', className)}>
      {children}
    </div>
  )
}

/** Subtle 3D tilt that follows the pointer, applied via CSS variables (no re-renders). */
export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`)
  }
  function onPointerLeave() {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={cn('tilt', className)}>
      {children}
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-[#8fe3ff] to-primary"
      style={{ scaleX }}
    />
  )
}
