import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Star } from 'lucide-react'

interface Project {
  title: string
  description: string
  emoji: string
  accentColor: string
  glowColor: string
  tech: string[]
  live?: string
  github: string
  featured?: boolean
  year: string
}

const projects: Project[] = [
  {
    title: 'RentEase',
    emoji: '🏠',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.13)',
    description:
      'Full-stack Indian rental platform for PGs, rooms, studios & flats. Features role-based JWT auth, Cloudinary photo uploads, OpenStreetMap listings, tenant-landlord messaging, admin panel, and advanced city/rent/type filters — live on Vercel & Render.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Tailwind CSS'],
    live: 'https://rentease-azure.vercel.app',
    github: 'https://github.com/raunak-cybersec/Rentease',
    featured: true,
    year: '2025',
  },
  {
    title: 'FinFlow',
    emoji: '💰',
    accentColor: '#818cf8',
    glowColor: 'rgba(129,140,248,0.15)',
    description:
      'Full-stack personal finance dashboard with AI-driven insights, budget tracking with visual progress indicators, and interactive Chart.js charts — secured with JWT authentication and built for real daily use.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Chart.js'],
    live: 'https://finflow-thzg.onrender.com',
    github: 'https://github.com/raunak-cybersec/finflow',
    featured: true,
    year: '2024',
  },
  {
    title: 'DevPulse',
    emoji: '🤖',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.15)',
    description:
      'AI-powered GitHub profile analyzer that fetches real-time data via the GitHub API, generates contribution insights, tech stack analysis, and a shareable developer score card.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub API'],
    live: 'https://devpulse-1dcgrc2f8-raunak-cybersecs-projects.vercel.app',
    github: 'https://github.com/raunak-cybersec/devpulse',
    featured: true,
    year: '2024',
  },
  {
    title: 'FitLife',
    emoji: '💪',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.12)',
    description:
      'Sleek, responsive fitness landing page with smooth scroll animations, workout sections, trainer profiles, and a fully mobile-optimized layout — built entirely with pixel-perfect vanilla CSS.',
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/raunak-cybersec/fitlife_landing_page',
    year: '2024',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.glowColor }}
      />

      {/* Animated border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}40` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}25` }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all" style={{ fontFamily: 'Syne, sans-serif' }}>
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {project.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: project.accentColor }}>
                    <Star size={9} className="fill-current" />
                    Featured
                  </span>
                )}
                <span className="text-white/25 text-[10px]">{project.year}</span>
              </div>
            </div>
          </div>

          {/* Icon links */}
          <div className="flex items-center gap-1.5">
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                title="Live Demo"
              >
                <ExternalLink size={14} />
              </motion.a>
            )}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.12, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              title="GitHub"
            >
              <Github size={14} />
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/48 text-[13.5px] leading-[1.75] mb-6 flex-1">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200"
              style={{
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}20`,
                color: project.accentColor,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2.5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white/90 transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}35, ${project.accentColor}18)`,
                border: `1px solid ${project.accentColor}30`,
              }}
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`glow-btn flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all duration-200 ${project.live ? 'px-4' : 'flex-1'}`}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Github size={12} />
            {project.live ? '' : 'View on GitHub'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-96 h-96 -right-28 top-16" style={{ background: '#818cf8', animationDelay: '-1s', opacity: 0.07 }} />
      <div className="orb w-72 h-72 left-10 bottom-10" style={{ background: '#22d3ee', animationDelay: '-5s', opacity: 0.06 }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-heading-line" />
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.15em] uppercase">Portfolio</span>
            <div className="section-heading-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Projects I've{' '}
            <span className="gradient-text">Shipped</span>
          </h2>
          <p className="text-white/38 text-[15px] mt-4 max-w-sm mx-auto leading-relaxed">
            Real products built and deployed — not just concepts or tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/raunak-cybersec"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white/65 hover:text-white border border-white/8 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
