import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Section({ id, heading, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <section id={id} className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="text-2xl md:text-3xl font-semibold"
        >
          {heading}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
