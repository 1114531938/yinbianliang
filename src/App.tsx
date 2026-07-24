import { FormEvent, useEffect, useState } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

type RouteKey = 'home' | 'story' | 'investing' | 'building' | 'advisory' | 'contact'

const navLinks: Array<{ label: string; route: RouteKey }> = [
  { label: '公司故事', route: 'story' },
  { label: '战略投资', route: 'investing' },
  { label: '创新孵化', route: 'building' },
  { label: '顾问服务', route: 'advisory' },
]

const pageContent: Record<
  Exclude<RouteKey, 'home' | 'contact'>,
  {
    number: string
    eyebrow: string
    title: string
    intro: string
    image: string
    imageAlt: string
    quote: string
    features: Array<{ number: string; title: string; text: string }>
  }
> = {
  story: {
    number: '01',
    eyebrow: 'COMPANY STORY',
    title: '看见变量\n创造增量。',
    intro:
      '因变量科技是一家面向未来的创新公司。我们相信，真正的增长来自对关键变量的持续洞察，以及将洞察转化为行动的能力。',
    image: '/images/studio-team.png',
    imageAlt: '因变量科技团队协作',
    quote: '以长期视角理解变化，以跨学科能力创造确定性。',
    features: [
      { number: '01', title: '洞察', text: '从市场、用户与技术之间识别真正影响结果的关键变量。' },
      { number: '02', title: '共创', text: '与合作伙伴并肩工作，让策略在真实业务中快速发生。' },
      { number: '03', title: '增长', text: '用可衡量的产品与商业成果，验证每一次创新。' },
    ],
  },
  investing: {
    number: '02',
    eyebrow: 'STRATEGIC INVESTING',
    title: '与长期主义者\n共同抵达未来。',
    intro:
      '我们关注由技术进步驱动的新机会，为具有清晰愿景、真实价值与持续行动力的团队提供战略支持。',
    image: '/images/case-ai-core.png',
    imageAlt: '人工智能数据核心概念视觉',
    quote: '资本不是终点，而是让正确方向加速发生的力量。',
    features: [
      { number: '01', title: '前沿技术', text: '关注人工智能、数据基础设施与新一代数字产品。' },
      { number: '02', title: '产业升级', text: '寻找能够重构效率、体验与价值链的创新方案。' },
      { number: '03', title: '长期陪伴', text: '从战略、产品到增长，为团队提供持续的共建支持。' },
    ],
  },
  building: {
    number: '03',
    eyebrow: 'VENTURE BUILDING',
    title: '从一个想法\n到增长中的事业。',
    intro:
      '我们将商业判断、产品设计与技术工程放在同一张桌上，用更短的路径完成验证、构建与规模化。',
    image: '/images/case-digital-platform.png',
    imageAlt: '未来数字产品概念视觉',
    quote: '好的创新不是被等待出来的，而是被一步步构建出来的。',
    features: [
      { number: '01', title: '定义机会', text: '梳理用户需求与商业边界，形成清晰的创新命题。' },
      { number: '02', title: '构建产品', text: '以设计和工程能力，把概念转化为可使用的产品。' },
      { number: '03', title: '验证增长', text: '通过真实数据迭代产品、模式与市场进入策略。' },
    ],
  },
  advisory: {
    number: '04',
    eyebrow: 'STRATEGIC ADVISORY',
    title: '复杂问题\n需要清晰答案。',
    intro:
      '我们与企业决策者共同面对增长、转型与创新中的关键议题，提供从判断到落地的一体化支持。',
    image: '/images/studio-installation.png',
    imageAlt: '沉浸式数字体验空间',
    quote: '真正有价值的建议，必须能够进入组织并转化为行动。',
    features: [
      { number: '01', title: '增长战略', text: '识别增长空间，建立目标、路径与关键指标。' },
      { number: '02', title: '数字转型', text: '重新连接业务、体验、数据与组织能力。' },
      { number: '03', title: '创新设计', text: '从战略概念到产品原型，降低创新的不确定性。' },
    ],
  },
}

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

function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  className = '',
}: {
  text: string
  initialDelay?: number
  charDelay?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), initialDelay)
    return () => window.clearTimeout(timer)
  }, [initialDelay])

  return (
    <h1
      className={`font-normal leading-[1.08] ${className}`}
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

function routeHref(route: RouteKey) {
  return route === 'home' ? '#home' : `#${route}`
}

function HomeHeader() {
  return (
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
              href={routeHref(link.route)}
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
  )
}

function Header({ currentRoute, dark = false }: { currentRoute: RouteKey; dark?: boolean }) {
  return (
    <header className="relative z-30 px-6 pt-6 md:px-12 lg:px-16">
      <nav
        className={`liquid-glass flex items-center justify-between rounded-xl px-4 py-2 ${
          dark ? 'liquid-glass-light' : ''
        }`}
      >
        <a
          href="#home"
          className="relative z-10 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl"
          aria-label="因变量科技有限公司首页"
        >
          <span className="md:hidden">因变量科技</span>
          <span className="hidden md:inline">因变量科技有限公司</span>
        </a>

        <div className="relative z-10 hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.route}
              href={routeHref(link.route)}
              className={`text-sm transition-colors hover:text-gray-300 ${
                currentRoute === link.route ? 'text-white' : 'text-white/75'
              }`}
            >
              {link.label}
              <span
                className={`mx-auto mt-1 block h-px bg-white transition-all ${
                  currentRoute === link.route ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="relative z-10 rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 sm:px-6"
        >
          开始合作
        </a>
      </nav>
    </header>
  )
}

function HomePage() {
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

      <HomeHeader />

      <section className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading
              text={'以远见定义未来\n以行动创造变量。'}
              className="mb-4 text-4xl text-white md:text-5xl lg:text-6xl xl:text-7xl"
            />

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

function DetailPage({
  route,
}: {
  route: Exclude<RouteKey, 'home' | 'contact'>
}) {
  const content = pageContent[route]

  return (
    <main className="min-h-screen bg-[#0b0d0e] text-white">
      <div className="relative min-h-[74vh] overflow-hidden">
        <img
          src={content.image}
          alt={content.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-[#0b0d0e]" />

        <Header currentRoute={route} />

        <section className="relative z-10 flex min-h-[74vh] items-end px-6 pb-14 pt-32 md:px-12 lg:px-16 lg:pb-20">
          <div className="w-full">
            <FadeIn delay={100} duration={700}>
              <div className="mb-5 flex items-center gap-3 text-xs tracking-[0.18em] text-white/65">
                <span>{content.number}</span>
                <span className="h-px w-10 bg-white/40" />
                <span>{content.eyebrow}</span>
              </div>
            </FadeIn>
            <AnimatedHeading
              text={content.title}
              className="max-w-4xl text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            />
          </div>
        </section>
      </div>

      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <FadeIn delay={250} duration={900}>
            <p className="max-w-3xl text-2xl font-light leading-relaxed text-white/90 md:text-3xl lg:text-4xl">
              {content.intro}
            </p>
          </FadeIn>
          <FadeIn delay={450} duration={900}>
            <blockquote className="border-l border-white/25 pl-6 text-lg font-light leading-relaxed text-white/55 md:text-xl">
              “{content.quote}”
            </blockquote>
          </FadeIn>
        </div>

        <div className="mt-20 grid border-t border-white/15 md:grid-cols-3 lg:mt-28">
          {content.features.map((feature, index) => (
            <FadeIn
              key={feature.number}
              delay={500 + index * 150}
              duration={800}
              className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <span className="text-xs tracking-[0.16em] text-white/35">
                {feature.number}
              </span>
              <h2 className="mt-8 text-2xl font-normal">{feature.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                {feature.text}
              </p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">准备好创造下一个关键变量？</p>
          <a
            href="#contact"
            className="w-fit rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-200"
          >
            与我们聊聊
          </a>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#e9eceb] text-[#0b0d0e]">
      <div className="contact-header">
        <Header currentRoute="contact" dark />
      </div>

      <section className="px-6 pb-16 pt-20 md:px-12 md:pt-28 lg:px-16 lg:pb-24">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <FadeIn delay={100} duration={700}>
              <p className="mb-6 text-xs tracking-[0.18em] text-black/45">
                START A CONVERSATION
              </p>
            </FadeIn>
            <AnimatedHeading
              text={'一起创造\n下一个变量。'}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            />
            <FadeIn delay={700}>
              <p className="mt-8 max-w-lg text-base leading-8 text-black/55 md:text-lg">
                告诉我们你正在面对的挑战、正在探索的机会，
                或者一个值得开始的新想法。
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={500} duration={900}>
            {submitted ? (
              <div className="flex min-h-[460px] flex-col justify-between rounded-2xl bg-[#0b0d0e] p-8 text-white md:p-12">
                <span className="text-xs tracking-[0.16em] text-white/40">已记录合作意向</span>
                <div>
                  <h2 className="text-3xl font-light md:text-4xl">感谢你的关注。</h2>
                  <p className="mt-5 max-w-md leading-7 text-white/55">
                    当前页面已经完成交互演示。接入公司正式邮箱或 CRM
                    后，即可将表单内容发送给业务团队。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-fit border-b border-white/50 pb-1 text-sm"
                >
                  返回填写
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-8">
                <label className="grid gap-3 border-b border-black/20 pb-4">
                  <span className="text-xs tracking-[0.12em] text-black/40">姓名 / NAME</span>
                  <input
                    required
                    name="name"
                    className="bg-transparent text-xl outline-none placeholder:text-black/25"
                    placeholder="如何称呼你"
                  />
                </label>
                <label className="grid gap-3 border-b border-black/20 pb-4">
                  <span className="text-xs tracking-[0.12em] text-black/40">联系方式 / CONTACT</span>
                  <input
                    required
                    name="contact"
                    className="bg-transparent text-xl outline-none placeholder:text-black/25"
                    placeholder="邮箱或手机号"
                  />
                </label>
                <label className="grid gap-3 border-b border-black/20 pb-4">
                  <span className="text-xs tracking-[0.12em] text-black/40">合作方向 / INTEREST</span>
                  <select
                    name="interest"
                    className="bg-transparent text-xl outline-none"
                    defaultValue="战略顾问"
                  >
                    <option>战略投资</option>
                    <option>创新孵化</option>
                    <option>战略顾问</option>
                    <option>其他合作</option>
                  </select>
                </label>
                <label className="grid gap-3 border-b border-black/20 pb-4">
                  <span className="text-xs tracking-[0.12em] text-black/40">项目介绍 / MESSAGE</span>
                  <textarea
                    required
                    name="message"
                    rows={3}
                    className="resize-none bg-transparent text-xl leading-relaxed outline-none placeholder:text-black/25"
                    placeholder="简单介绍你的项目或需求"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-3 w-full rounded-lg bg-[#0b0d0e] px-8 py-4 font-medium text-white transition-colors hover:bg-black/80 sm:w-fit"
                >
                  提交合作意向
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  )
}

function useRoute() {
  const getRoute = (): RouteKey => {
    const hash = window.location.hash.replace('#', '') as RouteKey
    const routes: RouteKey[] = [
      'home',
      'story',
      'investing',
      'building',
      'advisory',
      'contact',
    ]
    return routes.includes(hash) ? hash : 'home'
  }

  const [route, setRoute] = useState<RouteKey>(getRoute)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}

function App() {
  const route = useRoute()

  if (route === 'home') return <HomePage />
  if (route === 'contact') return <ContactPage />
  return <DetailPage key={route} route={route} />
}

export default App
