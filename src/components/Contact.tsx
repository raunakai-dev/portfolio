import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

const socials = [
  { icon: Mail, label: 'Email', value: 'raunak96963@gmail.com', href: 'mailto:raunak96963@gmail.com', color: 'var(--pink)', description: 'Best for formal outreach' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/raunak-rai', href: 'https://www.linkedin.com/in/raunak-rai-35968b316', color: 'var(--violet)', description: 'Connect professionally' },
  { icon: Github, label: 'GitHub', value: 'github.com/raunak-cybersec', href: 'https://github.com/raunak-cybersec', color: '#A78BFA', description: 'Check out my work' },
]

// ✅ Get your free key at https://web3forms.com → enter raunak96963@gmail.com
const WEB3FORMS_KEY = '0d3b8110-85bd-491a-b45c-d06d08ed5f15'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${fields.name}`,
          from_name: fields.name,
          email: fields.email,
          message: fields.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }


  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="orb w-[450px] h-[450px] -bottom-24 -left-24" style={{ background: 'var(--violet)', animationDelay: '-3s' }} />
      <div className="orb w-80 h-80 right-0 top-20" style={{ background: 'var(--pink)', animationDelay: '-2s' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-4">
            <div className="section-line" />
            Get In Touch
            <div className="section-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Let's Build Something{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-[15px] mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Open to internship opportunities — drop me a message and I'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-2 space-y-3"
          >
            <p className="text-[14px] leading-[1.8] mb-7" style={{ color: 'var(--text-secondary)' }}>
              I'm currently looking for internship roles in full-stack development and AI/ML. Whether you have an exciting opportunity or just want to say hi — my inbox is always open.
            </p>

            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.09 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 rounded-2xl glass-card group transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}20` }}
                >
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
                  <p className="text-xs font-medium group-hover:text-[var(--pink)] transition-colors truncate" style={{ color: 'var(--text-secondary)' }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-faint)' }}>{s.description}</p>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-faint)' }} className="shrink-0 group-hover:translate-x-1 transition-all duration-200" />
              </motion.a>
            ))}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 rounded-2xl flex items-center gap-3"
              style={{ background: 'rgba(0, 255, 135, 0.06)', border: '1px solid rgba(0, 255, 135, 0.18)' }}
            >
              <span className="ping-dot w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ background: 'var(--green)' }} />
              <p className="text-xs font-medium" style={{ color: 'rgba(0, 255, 135, 0.85)' }}>
                Available for internship / freelance — <span style={{ color: 'var(--green)' }}>Let's connect</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl space-y-5 glass-card"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Your Name</label>
                  <input
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about the opportunity or project you have in mind..."
                  className="form-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className="w-full btn-primary flex items-center justify-center gap-2.5 py-3.5 disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {status === 'idle' && <><Send size={15} /> Send Message</>}
                  {status === 'sending' && (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  )}
                  {status === 'success' && <><CheckCircle2 size={15} /> Message Sent!</>}
                  {status === 'error' && <><AlertCircle size={15} /> Try Again</>}
                </span>
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm font-medium"
                  style={{ color: 'var(--green)' }}
                >
                  🎉 Thanks! I'll get back to you within 24 hours.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
