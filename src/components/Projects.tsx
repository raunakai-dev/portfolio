import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Star } from 'lucide-react'

interface Project {
  title: string
  description: string
  emoji: string
  accentColor: string
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
    accentColor: '#FF2D78',
    description: 'Full-stack Indian rental platform for PGs, rooms, studios & flats. Role-based JWT auth, Cloudinary photo uploads, Leaflet.js interactive maps, tenant-landlord messaging, admin panel, and advanced city/rent/type filters. 10 REST API endpoints, 12 realistic Indian PG listings across 6 cities.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Leaflet.js', 'Tailwind'],
    live: 'https://rentease-azure.vercel.app',
    github: 'https://github.com/raunak-cybersec/Rentease',
    featured: true,
    year: '2025',
  },
  {
    title: 'FinFlow',
    emoji: '💰',
    accentColor: '#7C3AED',
    description: 'Full-stack personal finance dashboard with AI-driven insights, budget tracking with visual progress indicators, 9 REST API endpoints with Express.js, interactive Chart.js 30-day spending line chart and expense category donut chart — secured with JWT httpOnly cookies.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Chart.js', 'Tailwind'],
    live: 'https://finflow-thzg.onrender.com',
    github: 'https://github.com/raunak-cybersec/finflow',
    featured: true,
    year: '2024',
  },
  {
    title: 'DevPulse',
    emoji: '🤖',
    accentColor: '#00FF87',
    description: "AI-powered GitHub profile analyzer fetching real-time data via GitHub REST API. Computes a developer score from 100 based on repos, followers, stars, and activity using a weighted algorithm. Renders animated language bars, circular score ring with SVG stroke animation, and an AI-generated profile insight panel.",
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub API'],
    live: 'https://devpulse-1dcgrc2f8-raunak-cybersecs-projects.vercel.app',
    github: 'https://github.com/raunak-cybersec/devpulse',
    featured: true,
    year: '2024',
  },
  {
    title: 'Portfolio',
    emoji: '⚡',
    accentColor: '#FF9500',
    description: 'This very website — a modern, fully responsive personal developer portfolio with custom animated cursor, 3D Three.js hero section, dark/light theme switcher, radar skill charts, scroll-triggered animations, and a Formspree-powered contact form. Deployed on Vercel with custom domain.',
    tech: ['React', 'TypeScript', 'Vite', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    live: 'https://raunakrai.vercel.app',
    github: 'https://github.com/raunak-cybersec/portfolio',
    featured: true,
    year: '2025',
  },
  {
    title: 'FitLife',
    emoji: '💪',
    accentColor: '#06B6D4',
    description: 'Sleek, responsive fitness landing page with smooth scroll animations, workout sections, trainer profiles, and a fully mobile-optimized layout — built entirely with pixel-perfect vanilla CSS and HTML. Demonstrates mastery of pure CSS animations and responsive design.',
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/raunak-cybersec/fitlife_landing_page',
    year: '2024',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02) translateZ(10px)`
    el.style.boxShadow = `${x * 20}px ${y * 20}px 40px ${project.accentColor}25, 0 20px 60px ${project.accentColor}15`
  }
  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)'
      cardRef.current.style.boxShadow = ''
    }
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="glass-card rounded-2xl overflow-hidden flex flex-col h-full"
        style={{
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          borderTop: `2px solid ${project.accentColor}50`,
        }}
      >
        {/* Top bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-110"
                style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}25` }}
              >
                {project.emoji}
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: project.accentColor }}>
                      <Star size={8} className="fill-current" />
                      Featured
                    </span>
                  )}
                  <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{project.year}</span>
                </div>
              </div>
            </div>

            {/* Icon links */}
            <div className="flex items-center gap-1.5">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
                  title="Live Demo"
                >
                  <ExternalLink size={13} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
                title="GitHub"
              >
                <Github size={13} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] leading-[1.75] mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold"
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
          <div className="flex gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}40, ${project.accentColor}20)`,
                  border: `1px solid ${project.accentColor}35`,
                  color: project.accentColor,
                }}
              >
                <ExternalLink size={11} />
                Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 ${project.live ? 'px-4' : 'flex-1'}`}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <Github size={11} />
              {project.live ? '' : 'View on GitHub'}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-96 h-96 -right-28 top-16" style={{ background: 'var(--violet)', animationDelay: '-1s' }} />
      <div className="orb w-72 h-72 left-10 bottom-10" style={{ background: 'var(--pink)', animationDelay: '-5s' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-4">
            <div className="section-line" />
            Portfolio
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Projects I've{' '}
            <span className="gradient-text">Shipped</span>
          </h2>
          <p className="text-[15px] mt-4 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Real products built and deployed — not just concepts or tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
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
            className="btn-ghost inline-flex items-center gap-2.5"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
