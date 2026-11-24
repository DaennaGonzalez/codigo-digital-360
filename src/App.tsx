import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Citizenship from './pages/Citizenship'
import SafeInformation from './pages/SafeInformation'
import ArtificialIntelligence from './pages/ArtificialIntelligence'
import Productivity from './pages/Productivity'
import Reflection from './pages/Reflection'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const titles: Record<string, string> = {
      '/': 'Inicio', '/ciudadania-digital': 'Ciudadanía digital', '/informacion-segura': 'Información segura',
      '/inteligencia-artificial': 'Inteligencia artificial', '/productividad-digital': 'Productividad digital',
      '/reflexion': 'Nuestra reflexión', '/recursos': 'Recursos y créditos',
    }
    document.title = `${titles[pathname] ?? 'Página no encontrada'} | Código Digital 360`
  }, [pathname])
  return null
}

export default function App() {
  return <><RouteEffects /><Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ciudadania-digital" element={<Citizenship />} />
    <Route path="/informacion-segura" element={<SafeInformation />} />
    <Route path="/inteligencia-artificial" element={<ArtificialIntelligence />} />
    <Route path="/productividad-digital" element={<Productivity />} />
    <Route path="/reflexion" element={<Reflection />} />
    <Route path="/recursos" element={<Resources />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout></>
}
