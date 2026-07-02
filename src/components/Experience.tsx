import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, ExternalLink } from 'lucide-react'

interface Role {
  title: string
  company: string
  companyLink?: string
  type: 'work' | 'research'
  period: string
  location: string
  bullets: string[]
  tags: string[]
  color: string
}

const roles: Role[] = [
  {
    title: 'Product Engineering Intern (AI)',
    company: 'CCC Digital India Pvt. Ltd.',
    type: 'work',
    period: 'May 2026 – July 2026',
    location: 'Remote',
    color: 'var(--pink)',
    tags: ['LLMs', 'NLP', 'Python', 'REST APIs', 'Prompt Engineering', 'MongoDB'],
    bullets: [
      'Designed and developed an AI-powered Placement Recommendation System providing personalized internship and job recommendations based on student profiles, skills, academic performance, and career interests.',
      'Built intelligent workflows for resume parsing, skill extraction, job matching, company recommendation, and personalized learning roadmap generation using Large Language Models (LLMs).',
      'Engineered AI-driven modules for skill gap analysis, placement readiness scoring, ATS resume evaluation, and career optimization to improve student employability insights.',
      'Integrated LLM APIs, prompt engineering techniques, and automation workflows to generate accurate, context-aware recommendations while optimizing for response quality.',
      'Contributed to backend development by integrating REST APIs, database operations, and scalable recommendation pipelines, ensuring maintainable and production-ready code.',
    ],
  },
  {
    title: 'Research Intern',
    company: 'SRM University AP',
    type: 'research',
    period: 'May 2026 – July 2026',
    location: 'Andhra Pradesh, India',
    color: 'var(--violet)',
    tags: ['GPT', 'BERT', 'PyTorch', 'Hugging Face', 'NLP', 'Transformers'],
    bullets: [
      'Conducted research on Natural Language Text Summarization using Large Language Models (LLMs) including GPT and Transformer-based architectures.',
      'Implemented and evaluated extractive and abstractive text summarization techniques using modern NLP frameworks and pretrained language models.',
      'Worked with Python, PyTorch, Hugging Face Transformers, and NLP libraries for model development and experimentation.',
      'Performed text preprocessing, tokenization, stemming, stop-word removal, dataset preparation, and model evaluation using ROUGE and BLEU metrics.',
      'Collaborated with faculty mentors on research methodology, experimentation, technical documentation, and model performance analysis.',
    ],
  },
]

function ExperienceCard({ role, index }: { role: Role; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-12"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        style={{
          background: role.color,
          boxShadow: `0 0 16px ${role.color}80, 0 0 32px ${role.color}30`,
        }}
      >
        {role.type === 'work'
          ? <Briefcase size={9} color="white" />
          : <GraduationCap size={9} color="white" />
        }
      </div>

      {/* Card */}
      <div
        className="glass-card rounded-2xl p-6 group transition-all duration-300"
        style={{ borderLeft: `2px solid ${role.color}40` }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              {role.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: role.color }}>{role.company}</span>
              {role.companyLink && <ExternalLink size={11} style={{ color: role.color }} />}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: `${role.color}15`,
                border: `1px solid ${role.color}30`,
                color: role.color,
              }}
            >
              {role.period}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{role.location}</span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-5">
          {role.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-[13.5px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: role.color }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {role.tags.map(t => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
              style={{
                background: `${role.color}10`,
                border: `1px solid ${role.color}20`,
                color: role.color,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-80 h-80 -right-24 top-1/4" style={{ background: 'var(--pink)', animationDelay: '-3s' }} />
      <div className="orb w-64 h-64 left-10 bottom-10" style={{ background: 'var(--violet)', animationDelay: '-7s' }} />

      <div className="max-w-4xl mx-auto">
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
            Work Experience
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Where I've{' '}
            <span className="gradient-text">Worked</span>
          </h2>
          <p className="text-[15px] mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Real internships — building AI systems and shipping production-ready code
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[8px] top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--pink), var(--violet), transparent)' }}
          />
          <div className="space-y-10">
            {roles.map((role, i) => (
              <ExperienceCard key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
