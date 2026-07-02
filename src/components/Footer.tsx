import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

const socials = [
  { icon: Github, href: 'https://github.com/raunak-cybersec', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/raunak-rai-35968b316', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:raunak96963@gmail.com', label: 'Email' },
]

const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact']

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative pt-14 pb-10 px-6 overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--pink), var(--violet), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="gradient-text-pv font-black text-2xl" style={{ fontFamily: 'Syne, sans-serif' }}>RR.</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-faint)' }}>
              Full-Stack Web Developer & AI enthusiast<br />building real products with MERN + AI.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Navigation</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium transition-colors duration-200 hover:text-[var(--pink)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Connect</p>
            <div className="flex items-center gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--pink)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,45,120,0.3)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: 'var(--border)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-faint)' }}>
            Designed & built by
            <span className="font-medium" style={{ color: 'var(--text-muted)' }}>Raunak Rai</span>
            · Made with <Heart size={10} className="mx-0.5" style={{ color: 'var(--pink)', fill: 'var(--pink)' }} /> in India
            · {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>React · TypeScript · Three.js · Framer Motion</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                cursor: 'none',
              }}
              title="Back to top"
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
