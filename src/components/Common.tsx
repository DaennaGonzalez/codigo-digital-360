import { ChevronLeft, ChevronRight, ExternalLink, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PageHero({ title, subtitle, image, eyebrow }: { title:string; subtitle:string; image:string; eyebrow:string }) {
  return <header className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(10,23,48,.95),rgba(10,23,48,.45)),url(${image})`}}>
    <div className="container hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>
  </header>
}

export function SectionTitle({ eyebrow, children, light=false }: { eyebrow?:string; children:React.ReactNode; light?:boolean }) {
  return <div className={`section-title ${light?'light':''}`}>{eyebrow && <span>{eyebrow}</span>}<h2>{children}</h2><i /></div>
}

export function ImageZoom({ src, alt, caption, onOpen }: {src:string;alt:string;caption?:string;onOpen?:(src:string,alt:string)=>void}) {
  return <figure className="image-frame"><button onClick={() => onOpen?.(src,alt)} aria-label={`Ampliar: ${alt}`}><img src={src} alt={alt} loading="lazy" /><span><Maximize2 /> Ampliar</span></button>{caption && <figcaption>{caption}</figcaption>}</figure>
}

export function SourceLink({ href, children }: {href:string;children:React.ReactNode}) {
  return <a className="source-link" href={href} target="_blank" rel="noreferrer">{children} <ExternalLink size={15}/></a>
}

export function Pager({ prev, next }: {prev?:[string,string];next?:[string,string]}) {
  return <nav className="pager" aria-label="Navegación entre secciones">{prev ? <Link to={prev[1]}><ChevronLeft/> <span><small>Anterior</small>{prev[0]}</span></Link>:<span/>}{next&&<Link to={next[1]}><span><small>Siguiente</small>{next[0]}</span><ChevronRight/></Link>}</nav>
}
