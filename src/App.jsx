import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import {
  ArrowRight,
  Cpu,
  Database,
  Layers,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react'

const STREAM_URL =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

const navItems = [
  { label: '服务', href: '#services' },
  { label: '能力', href: '#capabilities' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
]

const services = [
  {
    number: '01',
    icon: Layers,
    title: '数字产品',
    english: 'Digital Products',
    description:
      '从产品策略、体验设计到研发交付，打造清晰、可靠且具有长期生命力的数字化产品。',
    tags: ['产品设计', 'Web 应用', '移动端'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI 智能应用',
    english: 'AI Solutions',
    description:
      '让人工智能真正进入业务流程，以智能体、知识库与自动化能力提升组织效率。',
    tags: ['智能体', '企业知识库', '流程自动化'],
  },
  {
    number: '03',
    icon: Database,
    title: '数据技术',
    english: 'Data Technology',
    description:
      '连接分散的数据资产，建立从采集、治理、分析到决策的完整数据价值链。',
    tags: ['数据中台', '商业智能', '增长分析'],
  },
]

const metrics = [
  { value: '03', label: '核心技术方向' },
  { value: '100%', label: '以业务结果为导向' },
  { value: '∞', label: '持续迭代的可能' },
]

function Logo() {
  return (
    <a
      href="#top"
      className="group relative z-50 flex items-center gap-3"
      aria-label="因变量科技首页"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 5h24v24H5z"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M10 11h5l3.8 12H24M12.5 17h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="11" r="1.5" fill="#5ed29c" />
      </svg>
      <span className="font-inter text-[14px] font-bold tracking-[0.16em]">
        因变量科技
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

function GridLines({ subtle = false }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden md:block ${
        subtle ? 'opacity-50' : ''
      }`}
      aria-hidden="true"
    >
      {[25, 50, 75].map((position) => (
        <span
          key={position}
          className="absolute inset-y-0 w-px bg-white/10"
          style={{ left: `${position}%` }}
        />
      ))}
    </div>
  )
}

function LiquidGlassCard() {
  return (
    <aside className="liquid-card h-[200px] w-[200px] translate-y-[-50px] p-5">
      <div className="relative z-10 flex h-full flex-col">
        <span className="font-inter text-[14px] font-medium tracking-[0.18em] text-white/70">
          [ 2026 ]
        </span>
        <h2 className="mt-auto text-[18px] font-medium leading-[1.16] tracking-[-0.02em]">
          以技术重构
          <br />
          <span className="font-instrument text-[22px] italic text-mint">
            Business Growth
          </span>
        </h2>
        <p className="mt-3 text-[11px] leading-[1.5] text-white/55">
          洞察真正的因，创造持续增长的果。
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

        <nav className="hidden items-center gap-10 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-white/80 transition-colors duration-300 hover:text-mint"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-mint/60 hover:text-mint md:hidden"
          aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
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
        aria-label="移动端导航"
      >
        {navItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            tabIndex={open ? 0 : -1}
            className="group flex items-center justify-between border-b border-white/10 py-5 text-[30px] font-bold tracking-[-0.04em]"
          >
            <span>{item.label}</span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-mint">
              0{index + 1}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-mint">
      {children}
    </p>
  )
}

function Services() {
  return (
    <section id="services" className="relative border-t border-white/10 bg-ink">
      <GridLines subtle />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel>What we do / 核心服务</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-[36px] font-bold leading-[1.08] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
              把复杂技术，
              <br />
              变成真实的<span className="font-instrument italic text-mint">价值</span>。
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-7 text-white/55 md:justify-self-end">
            我们横跨策略、设计与技术，关注问题背后的关键变量，
            为企业构建能够持续演进的数字能力。
          </p>
        </div>

        <div className="mt-16 grid border-l border-t border-white/10 md:grid-cols-3">
          {services.map(({ number, icon: Icon, title, english, description, tags }) => (
            <article
              key={number}
              className="service-card group relative min-h-[390px] border-b border-r border-white/10 p-7 md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] tracking-[0.18em] text-white/35">
                  / {number}
                </span>
                <Icon
                  size={24}
                  strokeWidth={1.25}
                  className="text-mint transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                />
              </div>
              <div className="mt-24">
                <p className="font-instrument text-[18px] italic text-white/45">
                  {english}
                </p>
                <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-5 max-w-sm text-[13px] leading-6 text-white/55">
                  {description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-t border-white/10 bg-[#0a100e]"
    >
      <div className="glow-orb pointer-events-none absolute -right-36 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-mint/10 blur-[90px]" />
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        <div className="border-white/10 px-6 py-24 md:border-r md:px-10 md:py-32 lg:px-14">
          <SectionLabel>Our approach / 工作方式</SectionLabel>
          <h2 className="mt-5 max-w-xl text-[36px] font-bold leading-[1.08] tracking-[-0.05em] sm:text-[48px]">
            找到关键变量，
            <br />
            让改变<span className="text-mint">发生。</span>
          </h2>
          <p className="mt-8 max-w-lg text-[14px] leading-7 text-white/55">
            我们不从预设答案出发。先理解业务、用户与技术之间的真实关系，
            再用小步验证、快速迭代的方式，把每一次投入转化为可衡量的进展。
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3 md:border-t-0 md:grid-cols-1">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-[150px] items-end justify-between border-b border-white/10 p-6 md:min-h-0 md:p-10"
            >
              <strong className="text-[48px] font-extrabold tracking-[-0.07em] text-white md:text-[60px]">
                {metric.value}
              </strong>
              <span className="max-w-[120px] text-right text-[11px] leading-5 tracking-[0.08em] text-white/45">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-ink">
      <GridLines subtle />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid gap-12 md:grid-cols-4">
          <SectionLabel>About us / 关于我们</SectionLabel>
          <div className="md:col-span-3">
            <p className="max-w-4xl text-[28px] font-medium leading-[1.45] tracking-[-0.035em] text-white/90 sm:text-[36px] lg:text-[44px]">
              因变量科技有限公司是一家面向未来的技术创新公司。我们相信，
              <span className="text-white/40">优秀的技术不应停留在概念，</span>
              而应成为推动组织进化与商业增长的直接力量。
            </p>
            <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 text-[12px] text-white/40 sm:flex-row sm:justify-between">
              <span>INVARIABLE TECHNOLOGY CO., LTD.</span>
              <span>科技 · 产品 · 数据 · 智能</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-mint text-ink">
      <div className="pointer-events-none absolute right-[-8%] top-[-55%] h-[520px] w-[520px] rounded-full border border-ink/10" />
      <div className="pointer-events-none absolute right-[-1%] top-[-42%] h-[420px] w-[420px] rounded-full border border-ink/10" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/55">
          Start a conversation
        </p>
        <div className="mt-5 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl text-[42px] font-extrabold leading-[0.95] tracking-[-0.065em] sm:text-[58px] lg:text-[76px]">
            一起创造下一个
            <br />
            关键变量。
          </h2>
          <span
            className="group inline-flex w-fit items-center gap-5 rounded-full bg-ink px-7 py-[15px] text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:-translate-y-1"
          >
            商务合作
            <MoveUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14">
        <Logo />
        <p>© 2026 因变量科技有限公司</p>
        <a href="#top" className="transition-colors hover:text-mint">
          返回顶部 ↑
        </a>
      </div>
    </footer>
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
    <div id="top" className="bg-ink font-inter text-white">
      <section className="relative min-h-screen overflow-hidden">
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

        <GridLines />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu open={menuOpen} onNavigate={() => setMenuOpen(false)} />

        <main className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] items-end px-6 pb-10 pt-[290px] md:px-10 md:pb-12 md:pt-[330px] lg:px-14 lg:pb-14">
          <div className="w-full">
            <LiquidGlassCard />

            <div className="-mt-8">
              <SectionLabel>Technology for meaningful change</SectionLabel>
              <h1 className="mt-4 max-w-[1050px] text-[40px] font-extrabold leading-[0.94] tracking-[-0.065em] sm:text-[52px] md:text-[64px] lg:text-[72px]">
                驱动变量，
                <span className="block">
                  定义未来<span className="text-mint">。</span>
                </span>
              </h1>

              <div className="mt-6 flex flex-col items-start gap-6 md:mt-7 md:flex-row md:items-end md:justify-between">
                <p className="max-w-lg text-[14px] leading-6 text-white/70">
                  因变量科技以产品、人工智能与数据技术，
                  帮助企业找到增长的关键变量，将复杂问题转化为清晰、可持续的数字价值。
                </p>

                <a
                  href="#services"
                  className="group inline-flex shrink-0 items-center gap-5 rounded-full bg-mint px-7 py-[15px] text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  了解我们
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
        <p className="absolute bottom-6 right-6 z-20 hidden rotate-180 text-[9px] uppercase tracking-[0.22em] text-white/35 [writing-mode:vertical-rl] lg:block">
          Scroll to explore
        </p>
      </section>

      <Services />
      <Capabilities />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
