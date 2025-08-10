import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

export default function AnimatedGradient() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0.25)
  const translateX = useTransform(x, [0, 1], ['-10%', '10%'])
  const translateY = useTransform(y, [0, 1], ['-10%', '10%'])

  useEffect(() => {
    const controls = [
      animate(x, 1, { duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }),
      animate(y, 1, { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }),
      animate(opacity, 0.35, { duration: 8, repeat: Infinity, repeatType: 'reverse' }),
    ]
    return () => controls.forEach(c => c.stop())
  }, [])

  return (
    <motion.div className="bg-aurora" style={{ x: translateX, y: translateY, opacity }} />
  )
}
