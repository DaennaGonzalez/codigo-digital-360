import { Menu, X, ArrowUp, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/content'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? scrollY / max * 100 : 0)
    }
    addEventListener('scroll', update, { passive: true }); update()
    return () => removeEventListener('scroll', update)
  }, [])
  return <div className="site-shell">
    <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
    <header className="navbar">
      <NavLink to="/" className="brand" aria-label="Código Digital 360, inicio"><ShieldCheck /><span>CÓDIGO DIGITAL <b>360</b></span></NavLink>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? 'nav-links open' : 'nav-links'} aria-label="Navegación principal">
        {navItems.map(([label, path]) => <NavLink key={path} to={path} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
    </header>
    <main id="contenido">{children}</main>
    <footer>
      <div><div className="brand footer-brand"><ShieldCheck /> CÓDIGO DIGITAL 360</div><p>Tu identidad. Tu información. Tu futuro digital.</p></div>
      <div><p>Proyecto académico independiente de Cultura Digital I.</p><p>No es un portal oficial de la UANL.</p></div>
      <NavLink to="/recursos">Bibliografía y créditos</NavLink>
    </footer>
    {progress > 18 && <button className="back-top" onClick={() => scrollTo({top:0,behavior:'smooth'})} aria-label="Regresar al inicio"><ArrowUp /></button>}
  </div>
}
