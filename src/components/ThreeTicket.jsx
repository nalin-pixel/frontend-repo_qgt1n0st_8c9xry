import { motion } from 'framer-motion'
import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'

export default function ThreeTicket({ code }){
  const canvasRef = useRef(null)
  useEffect(()=>{
    if (!code || !canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, code, { width: 96, margin: 0 })
  },[code])
  return (
    <motion.div initial={{ rotateX: 10, rotateY: -10, opacity: 0 }} animate={{ rotateX: 0, rotateY: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}
      className="relative w-full max-w-md rounded-3xl p-6 text-white border border-white/15 bg-gradient-to-br from-fuchsia-900/60 to-indigo-900/60 shadow-[0_20px_80px_rgba(255,0,200,0.2)]">
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,170,.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(80,120,255,.15),transparent_40%)]" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex-1">
          <p className="uppercase text-xs tracking-[.25em] text-white/70">Admit One</p>
          <p className="text-2xl font-extrabold">Cinemax Club</p>
          <p className="text-white/70 text-xs">Silicon University • Bhubaneswar</p>
        </div>
        <canvas ref={canvasRef} className="rounded-lg bg-white p-2" />
      </div>
    </motion.div>
  )
}
