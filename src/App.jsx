import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { ArrowRight, Menu, X } from 'lucide-react'

const STREAM_URL =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

const navItems = ['PROJECTS', 'BLOG', 'ABOUT', 'RESUME']

function Logo() {
  return (
    <a
      href="#top"
      className="group relative z-50 flex items-center gap-3"
      aria-label="CodeNest home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M27 10.5 16 4 5 10.5v11L16 28l11-6.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m13 12-4 4 4 4m6-8 4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-inter text-[15px] font-bold tracking-[0.22em]">
        CODENEST
      </span>
    </a>
  )
}

function VideoBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    let hls

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = STREAM_URL
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
    }

    const startPlayback = () => {
      video.play().catch(() => {})
    }

    video.addEventListener('canplay', startPlayback)
    return () => {
      video.removeEventListener('canplay', startPlayback)
      hls?.destroy()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover opacity-60"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  )
}

function LiquidGlassCard() {
  return (
    <aside className="liquid-card h-[200px] w-[200px] translate-y-[-50px] p-5">
      <div className="relative z-10 flex h-full flex-col">
        <span className="font-inter text-[14px] font-medium tracking-[0.18em] text-white/70">
          [ 2025 ]
        </span>
        <h2 className="mt-auto font-inter text-[18px] font-medium leading-[1.16] tracking-[-0.02em]">
          Taught by{' '}
          <span className="font-instrument text-[21px] italic text-mint">
            Industry
          </span>{' '}
          Professionals
        </h2>
        <p className="mt-3 font-inter text-[11px] leading-[1.45] text-white/55">
          Learn the craft from people building the products that shape tomorrow.
        </p>
      </div>
    </aside>
  )
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-inter text-[16px] font-medium text-white/80 transition-colors duration-300 hover:text-mint"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-mint/60 hover:text-mint md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function MobileMenu({ open, onNavigate }) {
  return (
    <div
      className={`fixed inset-0 z-30 flex bg-ink transition-all duration-500 md:hidden ${
        open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-4 opacity-0'
      }`}
      aria-hidden={!open}
    >
      <nav
        className="flex w-full flex-col justify-center gap-2 px-6 pt-20"
        aria-label="Mobile navigation"
      >
        {navItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={onNavigate}
            tabIndex={open ? 0 : -1}
            className="group flex items-center justify-between border-b border-white/10 py-5 font-inter text-[30px] font-bold tracking-[-0.04em]"
          >
            <span>{item}</span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-mint">
              0{index + 1}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-ink text-white">
      <VideoBackground />

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/20" />

      <svg
        className="pointer-events-none absolute left-1/2 top-[5%] h-[330px] w-[1000px] max-w-[120vw] -translate-x-1/2 opacity-70"
        viewBox="0 0 1000 330"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="ellipse-blur" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
          <linearGradient id="glow-fill" x1="180" y1="165" x2="820" y2="165">
            <stop stopColor="#10251f" stopOpacity="0" />
            <stop offset=".5" stopColor="#5ed29c" stopOpacity=".38" />
            <stop offset="1" stopColor="#10251f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="500"
          cy="165"
          rx="355"
          ry="42"
          fill="url(#glow-fill)"
          filter="url(#ellipse-blur)"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {[25, 50, 75].map((position) => (
          <span
            key={position}
            className="absolute inset-y-0 w-px bg-white/10"
            style={{ left: `${position}%` }}
          />
        ))}
      </div>

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] items-end px-6 pb-10 pt-[290px] md:px-10 md:pb-12 md:pt-[330px] lg:px-14 lg:pb-14">
        <div className="w-full">
          <LiquidGlassCard />

          <div className="-mt-8">
            <p className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-mint">
              Career-Ready Curriculum
            </p>
            <h1 className="mt-4 max-w-[1050px] font-inter text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.065em] sm:text-[52px] md:text-[64px] lg:text-[72px]">
              Launch your
              <span className="block">
                coding career<span className="text-mint">.</span>
              </span>
            </h1>

            <div className="mt-6 flex flex-col items-start gap-6 md:mt-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-lg font-inter text-[14px] leading-6 text-white/70">
                Master in-demand coding skills through hands-on projects, expert
                mentorship, and a curriculum designed to turn ambition into a
                career.
              </p>

              <a
                href="#get-started"
                className="group inline-flex shrink-0 items-center gap-5 rounded-full bg-mint px-7 py-[15px] font-inter text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Get Started
                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 z-20 hidden h-12 w-12 border-r border-t border-white/10 md:block" />
      <p className="absolute bottom-6 right-6 z-20 hidden rotate-180 font-inter text-[9px] uppercase tracking-[0.22em] text-white/35 [writing-mode:vertical-rl] lg:block">
        Scroll to explore
      </p>
    </div>
  )
}

export default App
