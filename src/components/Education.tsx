import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'

const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Web Technologies',
  'Natural Language Processing',
]

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="education" className="relative py-24 px-6 overflow-hidden">
      <div className="orb w-72 h-72 right-0 top-1/4" style={{ background: 'var(--pink)', animationDelay: '-4s' }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-4">
            <div className="section-line" />
            Education
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Academic{' '}
            <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card rounded-2xl p-8"
          style={{ borderLeft: '3px solid var(--pink)' }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255, 45, 120, 0.12)', border: '1px solid rgba(255, 45, 120, 0.2)' }}
              >
                <GraduationCap size={24} style={{ color: 'var(--pink)' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                  B.Tech — Computer Science & Engineering
                </h3>
                <p className="text-base font-semibold mt-0.5" style={{ color: 'var(--pink)' }}>
                  SRM University AP
                </p>
              </div>
            </div>
            <div
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                background: 'rgba(255, 45, 120, 0.1)',
                border: '1px solid rgba(255, 45, 120, 0.2)',
                color: 'var(--pink)',
              }}
            >
              2024 – 2028
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-5 mb-8">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <MapPin size={14} style={{ color: 'var(--violet)' }} />
              <span className="text-sm">Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={14} style={{ color: 'var(--violet)' }} />
              <span className="text-sm">2nd Year (Currently Enrolled)</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <BookOpen size={14} style={{ color: 'var(--violet)' }} />
              <span className="text-sm">Full-time</span>
            </div>
          </div>

          {/* Coursework */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-faint)' }}>
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course, i) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="tech-badge"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
