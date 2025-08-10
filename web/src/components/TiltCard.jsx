import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import clsx from 'clsx'

export default function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const posX = e.clientX - rect.left - rect.width / 2
    const posY = e.clientY - rect.top - rect.height / 2
    x.set(posX / 8)
    y.set(posY / 8)
  }

  function onMouseLeave() {
    x.set(0); y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={clsx('transition-transform will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
