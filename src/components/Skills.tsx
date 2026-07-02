import { useRef } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// SVG Tech Icons
const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    React: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
    JavaScript: (
      <svg viewBox="0 0 24 24" fill="#F7DF1E" className="w-5 h-5">
        <rect width="24" height="24" fill="#F7DF1E" rx="2"/>
        <path d="M6.5 17.5c.5.8 1.2 1.3 2.1 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.6-.7-2.7-1.6-2.7-3.3 0-1.6 1.2-2.9 3.2-2.9 1.4 0 2.4.5 3.1 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.6 0-1.1.4-1.1 1s.4.9 1.4 1.3l.6.2c1.9.8 3 1.7 3 3.5 0 2-1.6 3-3.7 3-2.1 0-3.4-1-4-2.4l1.7-1.1zm7.5.2c.4.7.8 1.3 1.7 1.3.8 0 1.4-.3 1.4-1.6v-8h2.1v8c0 2.6-1.5 3.8-3.7 3.8-2 0-3.1-1-3.7-2.2l2.2-1.3z" fill="#000"/>
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="#3178C6" className="w-5 h-5">
        <rect width="24" height="24" fill="#3178C6" rx="2"/>
        <path d="M13.5 13.5h2.8v1.1h-1.7v5.6h-1.1V13.5zm-5.4 1.1H5.5v-1.1h6.3v1.1H9.2v5.6H8.1v-5.6z" fill="white"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" fill="#339933" className="w-5 h-5">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 1.8l7.2 4-7.2 4-7.2-4 7.2-4zm-8 5.1l7 3.9v7.8l-7-3.9V8.9zm9 11.7V12.8l7-3.9v7.8l-7 3.9z"/>
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 24 24" fill="#47A248" className="w-5 h-5">
        <path d="M12 2C9.1 2 7 7.4 7 12c0 3.1 1.3 5.8 3 7.3V22l2-.5V19.3c1.7-1.5 3-4.2 3-7.3 0-4.6-2.1-10-3-10zm0 14.5c-.3 0-.5-.1-.7-.3-.4-.5-.6-1.3-.6-2.2s.2-1.7.6-2.2c.4-.5 1-.5 1.4 0 .4.5.6 1.3.6 2.2s-.2 1.7-.6 2.2c-.2.2-.4.3-.7.3z"/>
      </svg>
    ),
    Python: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2C8.1 2 8.5 3.7 8.5 3.7V5.4H12v.5H6.8S4 5.6 4 9.5s2.5 3.8 2.5 3.8H8V11.2s-.1-2.5 2.5-2.5H15s2.4.1 2.4-2.3V4.7C17.4 2.4 15.9 2 12 2zM9.7 3.7c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z" fill="#3776AB"/>
        <path d="M12 22c3.9 0 3.5-1.7 3.5-1.7V18.6H12v-.5h5.2S20 18.4 20 14.5s-2.5-3.8-2.5-3.8H16v2.1s.1 2.5-2.5 2.5H9s-2.4-.1-2.4 2.3v3.7C6.6 21.6 8.1 22 12 22zm2.3-1.7c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z" fill="#FFD43B"/>
      </svg>
    ),
    PyTorch: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" fill="#EE4C2C" opacity="0.15"/>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" fill="#EE4C2C"/>
      </svg>
    ),
    'Hugging Face': (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <text x="2" y="18" fontSize="16">🤗</text>
      </svg>
    ),
    'HTML/CSS': (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm14 2l-.3 3H8.5l.2 2h8.8l-.7 7-4.8 1.3-4.8-1.3-.3-3.5h2.2l.2 1.8 2.7.7 2.7-.7.3-3.2H7.2L6.5 5H18z" fill="#E34F26"/>
      </svg>
    ),
    'Express.js': (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <text x="2" y="16" fontSize="11" fontWeight="bold" fill="currentColor">ex</text>
      </svg>
    ),
    'Tailwind CSS': (
      <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-5 h-5">
        <path d="M12 6C9.3 6 7.5 7.3 6.8 9.8 7.8 8.5 9 8 10.5 8.2c.9.1 1.5.7 2.2 1.4 1.1 1.1 2.4 2.4 5.3 2.4 2.7 0 4.5-1.3 5.2-3.8-1 1.3-2.2 1.8-3.7 1.6-.9-.1-1.5-.7-2.2-1.4C16.2 7.3 14.9 6 12 6zM6.8 12C4.1 12 2.3 13.3 1.6 15.8c1-1.3 2.2-1.8 3.7-1.6.9.1 1.5.7 2.2 1.4 1.1 1.1 2.4 2.4 5.3 2.4 2.7 0 4.5-1.3 5.2-3.8-1 1.3-2.2 1.8-3.7 1.6-.9-.1-1.5-.7-2.2-1.4C11 13.3 9.7 12 6.8 12z"/>
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 24 24" fill="#F05032" className="w-5 h-5">
        <path d="M23.1 10.9L13.1.9c-.5-.5-1.3-.5-1.8 0L9.1 3.1l2.3 2.3c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.2 2.2c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.6-1-.4-1.6L12.2 8V15c.2.1.4.2.5.4.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.3.6-.4V7.9c-.2-.1-.4-.2-.6-.4-.4-.4-.6-1-.4-1.5L7.9 3.7.9 10.9c-.5.5-.5 1.3 0 1.8l10 10c.5.5 1.3.5 1.8 0l10.4-10.4c.5-.6.5-1.4 0-1.4z"/>
      </svg>
    ),
    Vercel: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor"/>
      </svg>
    ),
    SQL: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="#4479A1" strokeWidth="1.5"/>
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="#4479A1" strokeWidth="1.5"/>
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" fill="none" stroke="#4479A1" strokeWidth="1.5"/>
      </svg>
    ),
    'Chart.js': (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3.5a6.5 6.5 0 016.5 6.5H12V5.5z" fill="#FF6384"/>
        <path d="M5.5 14A6.5 6.5 0 0112 7.5V14H5.5z" fill="#36A2EB"/>
        <path d="M12 14h6.5A6.5 6.5 0 0112 20.5V14z" fill="#FFCE56"/>
      </svg>
    ),
    Postman: (
      <svg viewBox="0 0 24 24" fill="#FF6C37" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  }
  return icons[name] || <span className="text-base">{name[0]}</span>
}

interface SkillItem { name: string; level: number }
interface SkillGroup {
  category: string
  description: string
  color: string
  skills: SkillItem[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    description: 'Building pixel-perfect, performant UIs',
    color: 'var(--pink)',
    skills: [
      { name: 'React', level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 72 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'Tailwind CSS', level: 87 },
      { name: 'Chart.js', level: 72 },
    ],
  },
  {
    category: 'Backend',
    description: 'Crafting robust APIs and server logic',
    color: 'var(--violet)',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'Python', level: 78 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    category: 'AI / ML',
    description: 'NLP, LLMs, and intelligent systems',
    color: 'var(--green)',
    skills: [
      { name: 'PyTorch', level: 70 },
      { name: 'Hugging Face', level: 72 },
      { name: 'Python', level: 78 },
    ],
  },
  {
    category: 'Database & Tools',
    description: 'Data, DevOps & collaboration tools',
    color: '#FFD700',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Git', level: 87 },
      { name: 'Vercel', level: 83 },
      { name: 'Postman', level: 78 },
    ],
  },
]

// Radar Chart SVG
function RadarChart({ group }: { group: SkillGroup }) {
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 70
  const n = group.skills.length
  const levels = [0.25, 0.5, 0.75, 1.0]

  const points = (factor: number) =>
    group.skills.map((_, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2
      return { x: cx + r * factor * Math.cos(angle), y: cy + r * factor * Math.sin(angle) }
    })

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'

  const outerPts = points(1)
  const skillPts = group.skills.map((s, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    const factor = s.level / 100
    return { x: cx + r * factor * Math.cos(angle), y: cy + r * factor * Math.sin(angle) }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {levels.map((l, li) => (
        <polygon
          key={li}
          points={points(l).map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke={group.color}
          strokeOpacity={0.12}
          strokeWidth={1}
        />
      ))}
      {/* Axis lines */}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={group.color} strokeOpacity={0.15} strokeWidth={1} />
      ))}
      {/* Skill area */}
      <path d={toPath(skillPts)} fill={group.color} fillOpacity={0.18} stroke={group.color} strokeWidth={2} />
      {/* Skill dots */}
      {skillPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={group.color} filter={`drop-shadow(0 0 4px ${group.color})`} />
      ))}
      {/* Labels */}
      {outerPts.map((p, i) => {
        const dx = p.x - cx; const dy = p.y - cy
        const lx = cx + (r + 18) * Math.cos((2 * Math.PI * i) / n - Math.PI / 2)
        const ly = cy + (r + 18) * Math.sin((2 * Math.PI * i) / n - Math.PI / 2)
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill={group.color} opacity={0.8} fontFamily="Inter">
            {group.skills[i].name.length > 8 ? group.skills[i].name.slice(0, 7) + '…' : group.skills[i].name}
          </text>
        )
      })}
    </svg>
  )
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`
  }
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="glass-card rounded-2xl p-6 h-full"
        style={{
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          borderTop: `2px solid ${group.color}40`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              {group.category}
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{group.description}</p>
          </div>
          <div className="w-3 h-3 rounded-full" style={{ background: group.color, boxShadow: `0 0 10px ${group.color}80` }} />
        </div>

        {/* Radar chart */}
        <div className="flex justify-center mb-4">
          {inView && <RadarChart group={group} />}
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map(s => (
            <div key={s.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: `${group.color}10`, border: `1px solid ${group.color}20` }}>
              <TechIcon name={s.name} />
              <span className="text-[11px] font-semibold" style={{ color: group.color }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-80 h-80 -left-24 top-1/2 -translate-y-1/2" style={{ background: 'var(--pink)', animationDelay: '-4s' }} />
      <div className="orb w-64 h-64 right-10 bottom-20" style={{ background: 'var(--green)', animationDelay: '-6s' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-4">
            <div className="section-line" />
            Tech Stack
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[15px] mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Full-stack web + AI/ML — tools I use to design, build, and ship real products
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
