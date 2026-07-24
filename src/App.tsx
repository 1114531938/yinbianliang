import { useEffect, useState } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

const navLinks = [
  { label: '公司故事', href: '#story' },
  { label: '战略投资', href: '#investing' },
  { label: '创新孵化', href: '#building' },
  { label: '顾问服务', href: '#advisory' },
]

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = '',
}: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-opacity ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

type AnimatedHeadingProps = {
  text: string
  initialDelay?: number
  charDelay?: number
}

function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
}: AnimatedHeadingProps) {
  const [visible, setVisible] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), initialDelay)
    return () => window.clearTimeout(timer)
  }, [initialDelay])

  return (
    <h1
      className="mb-4 text-4xl font-normal leading-[1.08] text-white md:text-5xl lg:text-6xl xl:text-7xl"
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`} className="block">
          {line.split('').map((character, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay

            return (
              <span
                key={`${character}-${charIndex}`}
                className="inline-block transition-[opacity,transform] duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDelay: `${delay}ms`,
                }}
              >
                {character === ' ' ? '\u00A0' : character}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

function App() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <header className="relative z-10 px-6 pt-6 md:px-12 lg:px-16">
        <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
          <a
            href="#"
            className="relative z-10 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl"
            aria-label="因变量科技有限公司首页"
          >
            <span className="md:hidden">因变量科技</span>
            <span className="hidden md:inline">因变量科技有限公司</span>
          </a>

          <div className="relative z-10 hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white transition-colors hover:text-gray-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="relative z-10 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          >
            开始合作
          </a>
        </nav>
      </header>

      <section className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading text={'以远见定义未来\n以行动创造变量。'} />

            <FadeIn delay={800} duration={1000}>
              <p className="mb-5 max-w-2xl text-base text-gray-300 md:text-lg">
                我们携手具有远见的伙伴，以技术、资本与创造力，
                构建定义下一代商业的创新事业。
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <a
                  id="contact"
                  href="#advisory"
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                >
                  开始合作
                </a>
                <a
                  href="#story"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  <span className="relative z-10">探索业务</span>
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn
            delay={1400}
            duration={1000}
            className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end"
          >
            <div
              id="advisory"
              className="liquid-glass rounded-xl border border-white/20 px-6 py-3"
            >
              <p className="relative z-10 text-lg font-light md:text-xl lg:text-2xl">
                投资 · 共创 · 顾问
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}

export default App
