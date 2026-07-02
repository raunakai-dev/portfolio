import { useRef, useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

const ROLES = ['Full-Stack Developer', 'AI/ML Enthusiast', 'React Developer', 'Problem Solver', 'Node.js Developer']

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = words[wordIdx]
    if (!deleting && charIdx === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    } else {
      timeout.current = setTimeout(() => {
        setCharIdx(i => i + (deleting ? -1 : 1))
        setDisplayed(current.slice(0, charIdx + (deleting ? -1 : 1)))
      }, deleting ? speed / 2 : speed)
    }
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return displayed
}

// 3D Floating Blob
function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.8, 100, 200]}>
        <MeshDistortMaterial
          color="#FF2D78"
          attach="material"
          distort={0.55}
          speed={2.5}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  )
}

// Orbiting ring
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5 + 0.5
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.3
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.8, 0.04, 16, 100]} />
      <meshStandardMaterial color="#7C3AED" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
    </mesh>
  )
}

// Second ring
function OrbitRing2() {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.25
    ringRef.current.rotation.x = 1.2
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.5, 0.025, 16, 100]} />
      <meshStandardMaterial color="#00FF87" metalness={0.9} roughness={0.1} transparent opacity={0.5} />
    </mesh>
  )
}

// Small floating particles
function FloatingDots() {
  const groupRef = useRef<THREE.Group>(null)
  const dots = useRef(
    Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 6,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 0.06 + 0.03,
    }))
  )

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const d = dots.current[i]
      child.position.y = d.y + Math.sin(state.clock.elapsedTime * d.speed + i) * 0.4
    })
  })

  return (
    <group ref={groupRef}>
      {dots.current.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[d.size, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#FF2D78' : i % 3 === 1 ? '#7C3AED' : '#00FF87'}
            emissive={i % 3 === 0 ? '#FF2D78' : i % 3 === 1 ? '#7C3AED' : '#00FF87'}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#FF2D78" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#7C3AED" />
      <pointLight position={[0, -5, 3]} intensity={1} color="#00FF87" />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <AnimatedBlob />
      <OrbitRing />
      <OrbitRing2 />
      <FloatingDots />
    </>
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Mouse parallax on 3D canvas
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.transform = `rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden grid-bg">

      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] -top-40 -left-40" style={{ background: 'var(--pink)', animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] top-1/3 -right-32" style={{ background: 'var(--violet)', animationDelay: '-4s' }} />
      <div className="orb w-72 h-72 bottom-16 left-1/4" style={{ background: 'var(--green)', animationDelay: '-8s' }} />

      {/* LAYOUT: Text left, 3D right */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-0">

        {/* LEFT: Text Content */}
        <div className="flex-1 flex flex-col justify-center pt-24 pb-16 lg:py-0 max-w-xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 w-fit"
            style={{
              background: 'rgba(0, 255, 135, 0.08)',
              border: '1px solid rgba(0, 255, 135, 0.25)',
            }}
          >
            <span className="ping-dot w-2 h-2 rounded-full inline-block" style={{ background: 'var(--green)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--green)' }}>
              Open to Internship Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-6xl sm:text-7xl lg:text-[86px] font-black mb-4 leading-[0.92] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Raunak</span>
            <br />
            <span className="gradient-text">Rai</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="text-xl sm:text-2xl font-medium" style={{ color: 'var(--text-muted)' }}>
              I'm a{' '}
              <span className="gradient-text-pv font-bold">{role}</span>
              <span className="typewriter-cursor" />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: 'var(--text-secondary)' }}
          >
            2nd Year CSE @ SRM University AP — building full-stack AI-powered products, certified MongoDB developer, currently interning at CCC Digital India.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={16} />
                View My Work
              </span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center justify-center gap-2"
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {['React', 'Node.js', 'MongoDB', 'TypeScript', 'Python', 'PyTorch'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.06 }}
                className="tech-badge"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: 3D Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 w-full lg:w-auto"
          style={{
            height: '500px',
            maxWidth: '550px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease',
          }}
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 7], fov: 50 }}
              style={{ width: '100%', height: '100%' }}
              dpr={[1, 2]}
            >
              <Scene />
            </Canvas>
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--text-faint)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} style={{ color: 'var(--text-faint)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
