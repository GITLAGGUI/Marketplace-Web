import { motion, useScroll, useSpring } from 'framer-motion'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import AnimatedGradient from './components/AnimatedGradient'
import TiltCard from './components/TiltCard'
import Section from './components/Section'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Chat from './components/Chat'
import Auth from './pages/Auth'
import { ArrowRight } from 'lucide-react'

function Landing() {
  return (
    <main className="relative">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight"
              >
                Create. Showcase. Sell.
                <span className="block bg-gradient-to-r from-brand-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  A modern marketplace for creators & buyers
                </span>
              </div>
              <p
                className="mt-6 text-neutral-300 text-lg md:text-xl max-w-xl"
              >
                Upload rich media, chat in real-time, and let AI boost your listings with smart descriptions, tags, and recommendations.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-medium shadow-lg shadow-brand-500/20 hover:bg-brand-400 transition-colors"
                  to="/projects"
                >
                  Get started
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 font-medium border border-white/10 backdrop-blur-md shadow-glass hover:bg-white/10 transition-colors"
                  href="#features"
                >
                  Live demo
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-brand-500/20 to-cyan-400/20 blur-2xl" />
              <div
                className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-glass"
              >
                <img src="/images/landing-hero.svg" alt="Illustration of marketplace cards" className="w-full rounded-2xl border border-white/10" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { title: 'AI Descriptions', desc: 'One-click smart copy' },
                    { title: 'Media Uploads', desc: 'Images, video, files' },
                    { title: 'Realtime Chat', desc: 'Secure & snappy' },
                    { title: 'Recommendations', desc: 'Match buyers to creators' },
                  ].map((f, i) => (
                    <TiltCard key={i} className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10">
                      <div className="text-brand-300 text-sm">{String(i + 1).padStart(2, '0')}</div>
                      <div className="mt-1 font-semibold">{f.title}</div>
                      <div className="text-neutral-400 text-sm">{f.desc}</div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section id="features" heading="Built for performance and polish">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Glassmorphism UI', desc: 'Crisp cards, subtle blur, and soft shadows' },
            { title: 'Motion by default', desc: 'Smooth micro-interactions powered by Framer Motion' },
            { title: 'Accessible components', desc: 'Radix UI primitives for dialogs, tooltips, and more' },
          ].map((card, idx) => (
            <TiltCard key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xl font-semibold">{card.title}</div>
              <p className="mt-2 text-neutral-300">{card.desc}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section id="cta" heading="Ready to build?">
        <div className="flex flex-wrap items-center gap-4">
          <Link className="rounded-xl bg-brand-500 px-5 py-3 font-medium shadow-lg shadow-brand-500/20 hover:bg-brand-400 transition-colors" to="/projects">
            Create project
          </Link>
          <span className="text-neutral-400">or</span>
          <a className="rounded-xl bg-white/5 px-5 py-3 font-medium border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors" href="#features">
            Browse listings
          </a>
        </div>
      </Section>

      <footer className="py-16 text-center text-neutral-500">© {new Date().getFullYear()} Webapp. All rights reserved.</footer>
    </main>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden">
        <motion.div className="fixed left-0 right-0 top-0 h-1 bg-brand-500 origin-left z-50" style={{ scaleX }} />
        <AnimatedGradient />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
