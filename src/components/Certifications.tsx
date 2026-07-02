import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BadgeCheck, Award } from 'lucide-react'

interface Cert {
  title: string
  issuer: string
  date: string
  credentialId?: string
  verifyUrl?: string
  color: string
  icon: string
  badge: string
}

const certs: Cert[] = [
  {
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB, Inc.',
    date: 'April 2026',
    credentialId: 'MDBz7q2110a',
    verifyUrl: 'https://credly.com/badges/86391062',
    color: '#47A248',
    icon: '🍃',
    badge: 'Associate Developer',
  },
  {
    title: 'MongoDB Node.js Developer Path',
    issuer: 'MongoDB, Inc.',
    date: 'April 2026',
    credentialId: 'MDBz7q2110a',
    color: '#47A248',
    icon: '🟢',
    badge: 'Developer Path',
  },
]

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
      style={{ borderTop: `2px solid ${cert.color}50` }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${cert.color}10, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
          >
            {cert.icon}
          </div>
          <div>
            <div className="cert-badge mb-1.5">
              <Award size={10} />
              {cert.badge}
            </div>
            <h3 className="font-bold text-[15px] leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              {cert.title}
            </h3>
          </div>
        </div>

        {/* Verified checkmark */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}
        >
          <BadgeCheck size={18} style={{ color: cert.color }} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-semibold" style={{ color: cert.color }}>
          {cert.issuer}
        </span>
        <span
          className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          {cert.date}
        </span>
      </div>

      {/* Credential ID */}
      {cert.credentialId && (
        <p className="text-[11px] mb-4 font-mono" style={{ color: 'var(--text-faint)' }}>
          Credential ID: <span style={{ color: 'var(--text-muted)' }}>{cert.credentialId}</span>
        </p>
      )}

      {/* Verify link */}
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 hover:gap-2"
          style={{ color: cert.color }}
        >
          <ExternalLink size={11} />
          Verify Credential
        </a>
      )}
    </motion.div>
  )
}

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="certifications" className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-72 h-72 -left-16 top-1/3" style={{ background: '#47A248', animationDelay: '-3s' }} />
      <div className="orb w-64 h-64 right-0 bottom-20" style={{ background: 'var(--violet)', animationDelay: '-7s' }} />

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
            Certifications
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Verified{' '}
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-[15px] mt-4 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Industry-recognized certifications from leading technology organizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certs.map((c, i) => <CertCard key={c.title} cert={c} index={i} />)}
        </div>

        {/* MongoDB certified banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 p-5 rounded-2xl flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(71,162,72,0.08), rgba(71,162,72,0.04))',
            border: '1px solid rgba(71,162,72,0.2)',
          }}
        >
          <span className="text-3xl">🏆</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#47A248' }}>MongoDB Associate Developer Certified</p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Recognized for proficiency in MongoDB Atlas, Mongoose, schema design, aggregation pipelines, and production-ready database development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
