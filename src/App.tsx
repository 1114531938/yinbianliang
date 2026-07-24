import { useEffect, useState } from 'react'
import { ArrowRight, Clock, Menu, X } from 'lucide-react'
import {
  Shader,
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Swirl,
} from 'shaders/react'

const navItems = [
  { label: '项目', href: '#projects' },
  { label: '能力', href: '#studio' },
  { label: '洞察', href: '#journal' },
  { label: '联系', href: '#connect' },
]

function useLondonTime() {
  const getTime = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())

  const [time, setTime] = useState(getTime)

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getTime()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return time
}

function TextRoll({ children }: { children: string }) {
  return (
    <span className="h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="h-5 whitespace-nowrap">{children}</span>
        <span className="h-5 whitespace-nowrap">{children}</span>
      </span>
    </span>
  )
}

function ActionButton({
  children,
  dark = false,
  href = '#connect',
}: {
  children: string
  dark?: boolean
  href?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex w-fit items-center gap-4 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium transition-colors duration-300 sm:pl-6 sm:text-[14px] ${
        dark
          ? 'bg-gray-900 text-white hover:bg-gray-800'
          : 'bg-[#F26522] text-white hover:bg-[#e05a1a]'
      }`}
    >
      <TextRoll>{children}</TextRoll>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8 ${
          dark ? 'text-gray-900' : 'text-[#F26522]'
        }`}
      >
        <ArrowRight size={15} />
      </span>
    </a>
  )
}

function ShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <Shader
        className="h-full w-full"
        style={{ width: '100%', height: '100%' }}
        colorSpace="srgb"
        toneMapping="aces"
        disableTelemetry
      >
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} speed={0.35}>
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          >
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            >
              <FilmGrain strength={0.05} animated />
            </FlutedGlass>
          </ChromaFlow>
        </Swirl>
      </Shader>
    </div>
  )
}

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const londonTime = useLondonTime()

  return (
    <>
      <header className="relative z-30 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
        <div className="flex items-center justify-between rounded-full bg-white p-[5px] shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-7">
            <a
              href="#top"
              aria-label="因变量科技首页"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold tracking-tight text-white sm:h-10 sm:w-10 sm:text-[11px]"
            >
              因
            </a>
            <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <span className="hidden text-[13px] text-gray-600 lg:block">
              2026 Q1 合作开放
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
              <Clock size={14} />
              {londonTime} · London
            </span>
            <ActionButton dark>预约策略沟通</ActionButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[12px] font-medium text-white md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          >
            {menuOpen ? '关闭' : '菜单'}
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 flex items-end bg-black/60 transition-opacity duration-500 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`mx-3 mb-3 w-[calc(100%-1.5rem)] rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-[12px] text-gray-600">
              <Clock size={13} /> {londonTime} · London
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white"
              aria-label="关闭菜单"
            >
              <X size={17} />
            </button>
          </div>
          <nav className="mb-9 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-200 py-4 text-[28px] font-medium leading-8 text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ActionButton href="#connect">启动一个项目</ActionButton>
        </div>
      </div>
    </>
  )
}

function PartnerBadge() {
  return (
    <div className="flex w-fit items-center gap-3 rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:px-4">
      <svg
        viewBox="0 0 100 100"
        className="h-5 w-5 fill-current text-[#E8704E] sm:h-6 sm:w-6"
        aria-hidden="true"
      >
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
      </svg>
      <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
        创新服务伙伴
      </span>
      <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
        Featured
      </span>
    </div>
  )
}

function SectionBadge({ number, children }: { number: string; children: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 sm:mb-8">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
        {number}
      </span>
      <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
        {children}
      </span>
    </div>
  )
}

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">
      <ShaderBackground />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex-1" />
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
          因变量科技 · Invariable Studio
        </p>
        <h1 className="max-w-5xl text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
          我们为雄心勃勃的品牌
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          构建引领增长的数字体验，
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          让每一次创新产生结果。
        </h1>
        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
          <ActionButton>启动一个项目</ActionButton>
          <PartnerBadge />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      id="studio"
      className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="1">介绍因变量</SectionBadge>
        <h2 className="mb-12 max-w-5xl text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 lg:mb-28">
          策略驱动创意，
          <br />
          让数字体验连接商业与未来。
        </h2>

        <div className="lg:hidden">
          <div className="mb-10">
            <p className="mb-6 max-w-xl text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
              从研究、策略到设计与研发，我们帮助成长型品牌识别关键变量，
              释放产品、数据与人工智能的完整潜能。
            </p>
            <ActionButton href="#journal">了解我们的工作室</ActionButton>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <img
              src="/images/studio-team.png"
              alt="因变量团队正在进行产品设计研讨"
              className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
            />
            <img
              src="/images/studio-installation.png"
              alt="沉浸式数字体验空间"
              className="aspect-[3/2] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 lg:grid xl:gap-8">
          <img
            src="/images/studio-team.png"
            alt="因变量团队正在进行产品设计研讨"
            className="aspect-[438/346] w-full rounded-2xl object-cover"
          />
          <div className="self-start">
            <p className="mb-7 whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">
              从研究、策略到设计与研发，
              <br />
              我们帮助成长型品牌识别关键变量，
              <br />
              释放数字业务的完整潜能。
            </p>
            <ActionButton href="#journal">了解我们的工作室</ActionButton>
          </div>
          <img
            src="/images/studio-installation.png"
            alt="沉浸式数字体验空间"
            className="aspect-[3/2] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}

function HoverReveal({
  dark = false,
  children,
}: {
  dark?: boolean
  children: string
}) {
  return (
    <div
      className={`absolute bottom-4 left-4 flex h-9 w-9 items-center overflow-hidden rounded-full transition-all duration-300 ease-in-out group-hover:w-[160px] ${
        dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <span className="ml-4 whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
        {children}
      </span>
      <ArrowRight className="absolute right-[11px] -rotate-45 transition-transform duration-300 group-hover:rotate-0" size={14} />
    </div>
  )
}

function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="2">精选客户项目</SectionBadge>
        <h2 className="mb-10 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16">
          我们的项目
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
          <article id="journal">
            <div className="group relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
              <img
                src="/images/case-ai-core.png"
                alt="企业智能中枢项目视觉"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
              />
              <HoverReveal>了解更多</HoverReveal>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
              连接分散数据与业务知识，构建可持续进化的企业智能决策中枢
            </p>
            <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
              Atlas Intelligence
            </h3>
          </article>

          <article>
            <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#d6d0c8]">
              <img
                src="/images/case-digital-platform.png"
                alt="未来数字服务平台项目视觉"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
              />
              <HoverReveal dark>查看案例</HoverReveal>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
              将复杂服务重构为清晰、可信且转化导向的新一代数字平台
            </p>
            <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
              Nova Platform
            </h3>
          </article>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="connect" className="bg-gray-900 px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-white/45">
            Invariable Technology
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.04em]">
            一起创造下一个关键变量。
          </h2>
        </div>
        <ActionButton>开始合作</ActionButton>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </>
  )
}

export default App
