import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Raunak demonstrates exceptional problem-solving skills and a deep understanding of full-stack development. His work on the AI placement recommendation system was production-ready and showed remarkable initiative.",
    name: "Faculty Mentor",
    role: "Research Guide, SRM University AP",
    initials: "FM",
    color: 'var(--pink)',
  },
  {
    quote: "One of the most driven developers I've worked with. Raunak picked up LLM APIs and prompt engineering within days and delivered a fully functional recommendation engine ahead of schedule.",
    name: "Team Lead",
    role: "CCC Digital India Pvt. Ltd.",
    initials: "TL",
    color: 'var(--violet)',
  },
  {
    quote: "Raunak's RentEase project is genuinely production-grade. The attention to detail — role-based auth, map integration, real-time messaging — shows he thinks like a professional developer.",
    name: "Peer Reviewer",
    role: "Senior Developer",
    initials: "PR",
    color: 'var(--green)',
  },
  {
    quote: "His understanding of NLP fundamentals and ability to implement transformer-based models from scratch using Hugging Face is impressive for a 2nd-year student.",
    name: "Research Supervisor",
    role: "NLP Lab, SRM University AP",
    initials: "RS",
    color: '#FFD700',
  },
]

// Duplicate for infinite scroll effect
const allTestimonials = [...testimonials, ...testimonials]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="glass-card rounded-2xl p-6 shrink-0 w-[320px] sm:w-[360px]"
      style={{ borderTop: `2px solid ${t.color}40` }}
    >
      <Quote size={20} style={{ color: t.color, opacity: 0.6 }} className="mb-4" />
      <p className="text-[13.5px] leading-[1.75] mb-5 italic" style={{ color: 'var(--text-secondary)' }}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="orb w-80 h-80 -left-20 bottom-0" style={{ background: 'var(--violet)', animationDelay: '-5s' }} />

      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="text-center mb-16 px-6"
      >
        <div className="section-label justify-center mb-4">
          <div className="section-line" />
          Testimonials
          <div className="section-line" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
          What People{' '}
          <span className="gradient-text">Say</span>
        </h2>
        <p className="text-[14px] mt-4" style={{ color: 'var(--text-muted)' }}>
          Feedback from mentors, supervisors, and collaborators
        </p>
      </motion.div>

      {/* Infinite scroll carousel */}
      <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
        <div className="testimonials-track px-6">
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
