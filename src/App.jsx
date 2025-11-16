import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { Film, Ticket, LogIn, LogOut, Calendar, QrCode, ScanLine } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { supabase } from './lib/supabase'
import AuthModal from './components/AuthModal'
import ThreeTicket from './components/ThreeTicket'

function Navbar({ session, onShowAuth }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-fuchsia-500/10">
          <Link to="/" className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 10 }} className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-500/40">
              <Film className="text-white" size={22} />
            </motion.div>
            <div>
              <p className="text-white font-bold tracking-wide text-sm">CINEMAX CLUB</p>
              <p className="text-fuchsia-300 text-[10px] uppercase tracking-[0.2em]">Silicon University</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <NavButton to="#features" label="Features" />
            <NavButton to="#shows" label="Shows" />
            <NavButton to="#about" label="About" />
            {session ? (
              <>
                <NavButton to="#my" label="My Bookings" icon={<Ticket size={16} />} />
                <PrimaryButton onClick={async ()=>{ await supabase.auth.signOut(); toast.success('Signed out')}} label="Logout" />
              </>
            ): (
              <PrimaryButton onClick={onShowAuth} icon={<LogIn size={16} />} label="Login / Register" />
            )}
          </div>
          <button onClick={()=>setOpen(v=>!v)} className="md:hidden text-white">☰</button>
        </div>
      </div>
    </div>
  )
}

function NavButton({ to, label, icon }){
  return (
    <a href={to} className="group relative px-3 py-2 text-sm text-white/90">
      <span className="relative z-10 flex items-center gap-2">{icon}{label}</span>
      <span className="absolute inset-0 -z-0 rounded-xl bg-white/5 group-hover:bg-white/10 transition" />
      <span className="absolute inset-0 -z-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20" />
    </a>
  )
}

function PrimaryButton({ to, label, icon, onClick }){
  const Comp = to ? 'a' : 'button'
  const props = to ? { href: to } : { onClick }
  return (
    <Comp {...props} className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white">
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition" />
      <span className="absolute inset-0 rounded-xl blur-xl bg-fuchsia-500/30" />
      <span className="relative z-10 flex items-center gap-2">{icon}{label}</span>
    </Comp>
  )
}

function Hero(){
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0,1], [0,-200])
  return (
    <section className="relative h-[90vh] overflow-hidden" id="top">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/90" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
      <motion.div style={{ y }} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full grid md:grid-cols-2 gap-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight"
            >
              Futuristic Movie Nights at Silicon University
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="mt-4 text-white/80 max-w-xl">
              Join Cinemax Club for immersive screenings, premium seats, and a holographic ticketing experience.
            </motion.p>
            <div className="mt-8 flex items-center gap-4">
              <PrimaryButton to="#shows" icon={<Calendar size={16}/>} label="Book a Show" />
              <NavButton to="#features" label="Explore" />
            </div>
          </div>
          <motion.div initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{ once:true }} className="hidden md:block">
            <TiltCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TiltCard(){
  return (
    <motion.div whileHover={{ rotateX: 6, rotateY: -8, translateZ: 20 }} className="relative h-80 rounded-3xl bg-gradient-to-br from-fuchsia-800/40 to-indigo-800/40 border border-white/10 p-6 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,170,.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(80,120,255,.15),transparent_40%)]" />
      <div className="relative z-10 text-white h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <Ticket size={18} className="text-fuchsia-300"/>
          <p className="uppercase tracking-[.2em] text-xs text-fuchsia-200">Holographic Pass</p>
        </div>
        <div>
          <p className="text-sm text-white/70">Admit One</p>
          <p className="text-3xl font-extrabold">Cinemax Club</p>
          <p className="text-white/60">Silicon University, Bhubaneswar</p>
        </div>
        <div className="flex items-center justify-between text-xs text-white/60">
          <span className="">3D • Dolby • Laser</span>
          <span className="">@cinemax</span>
        </div>
      </div>
    </motion.div>
  )
}

function Features(){
  const items = [
    { icon: <Ticket/>, title: '3D Holographic Tickets', desc: 'Encrypted QR with animated confirmations.' },
    { icon: <Calendar/>, title: 'Smart Seat Selection', desc: 'Hold seats for 5 minutes while you pay.' },
    { icon: <ScanLine/>, title: 'Realtime Check‑ins', desc: 'Admins scan QR and mark attendance.' },
  ]
  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-black to-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,170,.08),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white text-center">A Cinematic 3D Experience</h2>
        <p className="text-white/70 text-center mt-3">Dark neon theme, parallax layers, and tilting 3D cards throughout.</p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((it,i)=> (
            <motion.div key={i} whileHover={{ rotateX: 6, rotateY: -6, translateZ: 20 }} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-fuchsia-500/10 to-indigo-500/10" />
              <div className="relative z-10">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-fuchsia-600/30 border border-white/10 mb-4">
                  {it.icon}
                </div>
                <p className="font-semibold">{it.title}</p>
                <p className="text-white/70 text-sm mt-1">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Shows(){
  const shows = [
    { id: 1, title: 'Interstellar', time: '7:00 PM', hall: 'A1' },
    { id: 2, title: 'Oppenheimer', time: '9:30 PM', hall: 'A1' },
  ]
  return (
    <section id="shows" className="relative py-24 bg-gradient-to-b from-black to-black/95">
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-black text-white">Upcoming Shows</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {shows.map(s => (
            <motion.div key={s.id} whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{s.title}</p>
                  <p className="text-white/70 text-sm">{s.time} • Hall {s.hall}</p>
                </div>
                <PrimaryButton to="#auth" icon={<Ticket size={16}/>} label="Book" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="relative bg-black py-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 text-white/60 text-sm flex items-center justify-between">
        <p>© {new Date().getFullYear()} Cinemax Club • Silicon University</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(()=>{
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s)=> setSession(s))
    return () => sub.subscription.unsubscribe()
  },[])

  const dummyEncryptedCode = useMemo(()=>{
    return btoa(JSON.stringify({ id: 'DEMO-QR', ts: Date.now() }))
  },[])

  return (
    <div className="bg-black min-h-screen">
      <Toaster richColors position="top-center"/>
      <Navbar session={session} onShowAuth={()=>setShowAuth(true)} />
      <Hero />
      <Features />
      <Shows />
      <section id="my" className="py-24 bg-black">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-2xl font-bold text-white mb-6">3D Ticket Preview</h3>
          <ThreeTicket code={dummyEncryptedCode} />
        </div>
      </section>
      <Footer />
      <AuthModal open={showAuth} onClose={()=>setShowAuth(false)} onAuthed={()=>setShowAuth(false)} />
    </div>
  )
}
