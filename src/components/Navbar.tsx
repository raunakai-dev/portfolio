import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../App'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) { setActive(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur py-3' : 'py-5'}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
          <span className="gradient-text-pv">RR</span>
          <span style={{ color: 'var(--text-faint)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 relative group ${active === link.href.slice(1) ? '' : ''}`}
              style={{ color: active === link.href.slice(1) ? 'var(--pink)' : 'var(--text-muted)' }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--pink), var(--violet))',
                  width: active === link.href.slice(1) ? '100%' : '0',
                }}
              />
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300 rounded-full group-hover:w-full"
                style={{
                  background: 'linear-gradient(90deg, var(--pink), var(--violet))',
                  width: active === link.href.slice(1) ? '100%' : '0',
                  opacity: active === link.href.slice(1) ? 0 : 1,
                }}
              />
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="relative w-11 h-6 rounded-full transition-all duration-300 border-none outline-none"
            style={{
              background: 'linear-gradient(135deg, var(--pink), var(--violet))',
              boxShadow: '0 0 12px rgba(255, 45, 120, 0.4)',
              cursor: 'none',
            }}
            aria-label="Toggle theme"
          >
            <motion.span
              className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center shadow-md"
              animate={{ left: theme === 'light' ? '23px' : '3px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {theme === 'dark'
                ? <Moon size={9} style={{ color: '#7C3AED' }} />
                : <Sun size={9} style={{ color: '#FF2D78' }} />
              }
            </motion.span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-2 text-sm rounded-xl"
          >
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Row */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', cursor: 'none' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon size={15} style={{ color: 'var(--pink)' }} /> : <Sun size={15} style={{ color: 'var(--pink)' }} />}
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)', cursor: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden nav-blur overflow-hidden"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, var(--pink), var(--violet))' }}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
