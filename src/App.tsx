import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// ===========================
// THEME CONTEXT
// ===========================
type Theme = 'dark' | 'light'
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })
export const useTheme = () => useContext(ThemeContext)

// ===========================
// CURSOR TRAIL
// ===========================
function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef(0)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    if (mobile) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }

      // Spawn trail particle
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      const hue = Math.random() > 0.5 ? '#FF2D78' : '#7C3AED'
      trail.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        background: ${hue};
        box-shadow: 0 0 6px ${hue};
        width: ${Math.random() * 4 + 3}px;
        height: ${Math.random() * 4 + 3}px;
      `
      document.body.appendChild(trail)
      setTimeout(() => trail.remove(), 600)
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(el.tagName === 'A' || el.tagName === 'BUTTON' || !!el.closest('a') || !!el.closest('button'))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [mobile])

  if (mobile) return null
  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}

// ===========================
// SCROLL PROGRESS BAR
// ===========================
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

// ===========================
// APP
// ===========================
export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('rr-theme') as Theme) || 'dark'
  })

  const toggle = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('rr-theme', next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="noise-overlay" />
        <ScrollProgress />
        <CursorTrail />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}
