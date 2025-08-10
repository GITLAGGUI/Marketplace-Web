import * as Tooltip from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md shadow-glass"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-400" />
            <Link to="/" className="font-semibold tracking-tight">Webapp</Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link to="/chat" className="hover:text-white transition-colors">Chat</Link>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a href="#live-demo" className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/10 transition-colors">Live demo</a>
                </Tooltip.Trigger>
                <Tooltip.Content className="rounded-md bg-neutral-900 px-2 py-1.5 text-xs text-neutral-200 border border-white/10">
                  Interactive example UI
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </motion.nav>
      </div>
    </div>
  )
}
