import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, GraduationCap, Zap, Code2, Cpu, ArrowRight } from 'lucide-react'

const stats = [
  { label: 'Projects\nShipped', value: '4+' },
  { label: 'Technologies\nMastered', value: '17+' },
  { label: 'Years\nCoding', value: '2+' },
  { label: 'Internships\nCompleted', value: '2' },
]

const facts = [
  { icon: GraduationCap, text: '2nd Year B.Tech CSE @ SRM University AP', color: 'var(--pink)' },
  { icon: MapPin, text: 'Andhra Pradesh, India', color: 'var(--violet)' },
  { icon: Cpu, text: 'AI/ML Research Intern — NLP & LLMs', color: 'var(--green)' },
  { icon: Zap, text: 'MongoDB Associate Developer Certified', color: '#FFD700' },
  { icon: Code2, text: 'React · Node.js · MongoDB · Python · PyTorch', color: 'var(--violet-light, #A78BFA)' },
]

// 3D tilt card hook
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }
  return { ref, onMove, onLeave }
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })
  const tilt = use3DTilt()

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Orbs */}
      <div className="orb w-96 h-96 bottom-0 right-0" style={{ background: 'var(--violet)', animationDelay: '-2s' }} />
      <div className="orb w-72 h-72 -left-20 top-1/3" style={{ background: 'var(--pink)', animationDelay: '-6s' }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* 3D Tilt Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMove}
              onMouseLeave={tilt.onLeave}
              className="relative w-[300px] h-[320px] sm:w-[340px] sm:h-[360px]"
              style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d' }}
            >
              {/* Gradient border glow */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, var(--pink), var(--violet), var(--green))',
                  padding: '2px',
                  borderRadius: '28px',
                  animation: 'orb-drift 6s ease-in-out infinite',
                }}
              >
                <div className="w-full h-full rounded-[26px]" style={{ background: 'var(--bg)' }} />
              </div>

              {/* Inner Content — Real profile photo */}
              <div className="absolute inset-[2px] rounded-[26px] overflow-hidden">
                <img
                  src="/photo.jpg"
                  alt="Raunak Rai"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(1.02) contrast(1.02)' }}
                />
                {/* Subtle gradient overlay at bottom for depth */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,15,0.45), transparent)',
                  }}
                />
              </div>

              {/* Floating badge — bottom */}
              <motion.div
                className="float-badge absolute -bottom-5 -right-5 glass-card rounded-2xl px-4 py-2.5 flex items-center gap-2"
                style={{ border: '1px solid rgba(0,255,135,0.2)' }}
              >
                <span className="ping-dot w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'var(--green)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--green)' }}>Open to Internships</span>
              </motion.div>

              {/* Floating badge — top */}
              <motion.div
                className="float-badge-rev absolute -top-5 -left-5 glass-card rounded-2xl px-4 py-2.5 flex items-center gap-2"
                style={{ border: '1px solid rgba(255,45,120,0.2)' }}
              >
                <span className="text-xs font-semibold" style={{ color: 'var(--pink)' }}>MongoDB Certified</span>
                <span className="text-base">🏆</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="section-label">
              <div className="section-line" />
              About Me
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-[1.1] tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Building things for the{' '}
              <span className="gradient-text">web & beyond</span>
            </h2>

            <p className="text-[15px] leading-[1.85] mb-4" style={{ color: 'var(--text-secondary)' }}>
              I'm Raunak Rai — a 2nd Year CSE student at SRM University AP, obsessed with building full-stack web applications and AI-powered systems that are fast, functional, and impactful.
            </p>
            <p className="text-[15px] leading-[1.85] mb-4" style={{ color: 'var(--text-secondary)' }}>
              Currently interning as a <strong style={{ color: 'var(--pink)' }}>Product Engineering Intern (AI)</strong> at CCC Digital India, where I'm building AI-driven placement recommendation systems using LLMs and NLP. Also working as a <strong style={{ color: 'var(--violet)' }}>Research Intern</strong> at SRM University AP, doing NLP text summarization with GPT and Transformers.
            </p>
            <p className="text-[15px] leading-[1.85] mb-8" style={{ color: 'var(--text-secondary)' }}>
              I'm a <strong style={{ color: '#FFD700' }}>MongoDB Associate Developer</strong> certified developer. I ship real products — not just tutorials.
            </p>

            {/* Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
              {facts.map(({ icon: Icon, text, color }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm p-2.5 rounded-xl transition-all duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span className="text-[13px]">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="text-center p-3 rounded-2xl glass-card"
                >
                  <div className="gradient-text text-2xl font-black">{s.value}</div>
                  <div className="text-[10px] mt-1 leading-snug whitespace-pre-line" style={{ color: 'var(--text-faint)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-colors"
              style={{ color: 'var(--pink)' }}
            >
              Let's work together
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
