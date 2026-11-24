import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Download, Pause, Play, RotateCcw, RotateCw, Volume2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { images, prompts } from '../data/content'
import { asset } from '../utils/assets'

export function Lightbox({items=images, index, onClose, onMove}:{items:readonly (readonly string[])[];index:number|null;onClose:()=>void;onMove?:(i:number)=>void}){
  const closeRef=useRef<HTMLButtonElement>(null)
  useEffect(()=>{ if(index===null)return; closeRef.current?.focus(); const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='ArrowRight')onMove?.((index+1)%items.length);if(e.key==='ArrowLeft')onMove?.((index-1+items.length)%items.length)}; addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[index,onClose,onMove,items])
  if(index===null)return null
  const item=items[index]
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={item[1]} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <button ref={closeRef} className="close" onClick={onClose} aria-label="Cerrar"><X/></button>
    {items.length>1&&<button className="light-prev" onClick={()=>onMove?.((index-1+items.length)%items.length)} aria-label="Imagen anterior"><ChevronLeft/></button>}
    <figure><img src={asset(`assets/images/${item[0]}`)} alt={item[2]}/><figcaption><strong>{item[1]}</strong><span>{item[3]}</span></figcaption></figure>
    {items.length>1&&<button className="light-next" onClick={()=>onMove?.((index+1)%items.length)} aria-label="Imagen siguiente"><ChevronRight/></button>}
  </div>
}

export function PromptLab(){
  const [active,setActive]=useState(0);const [copied,setCopied]=useState('')
  const p=prompts[active]
  const copy=async(text:string,id:string)=>{await navigator.clipboard.writeText(text);setCopied(id);setTimeout(()=>setCopied(''),1700)}
  return <div className="prompt-lab">
    <div className="prompt-tabs" role="tablist" aria-label="Temas del laboratorio">{prompts.map((x,i)=><button key={x.title} role="tab" aria-selected={i===active} onClick={()=>setActive(i)}>{x.title}</button>)}</div>
    <div className="prompt-grid" role="tabpanel"><article><span className="tag">Prompt básico</span><blockquote>{p.basic}</blockquote><button className="copy" onClick={()=>copy(p.basic,'basic')}>{copied==='basic'?<Check/>:<Copy/>}{copied==='basic'?'Copiado':'Copiar prompt'}</button><h3>Ejemplo de respuesta básica</h3><p>{p.basicAnswer}</p></article>
    <article className="structured"><span className="tag">Prompt estructurado</span><blockquote>{p.structured}</blockquote><button className="copy" onClick={()=>copy(p.structured,'structured')}>{copied==='structured'?<Check/>:<Copy/>}{copied==='structured'?'Copiado':'Copiar prompt'}</button><h3>Ejemplo de respuesta estructurada</h3><p>{p.structuredAnswer}</p></article></div>
    <aside className="difference"><strong>¿Qué cambia?</strong> {p.difference} <span>Recomendación: verifica siempre cifras, nombres, enlaces y fuentes.</span></aside>
    <p className="note">Estos son ejemplos didácticos redactados para la actividad; no son capturas ni mediciones de una prueba externa.</p>
  </div>
}

export function VideoCard({id,title,institution,description}:{id:string;title:string;institution:string;description:string}){
  const [load,setLoad]=useState(false);const url=`https://www.youtube.com/watch?v=${id}`
  return <article className="video-card"><div className="video-stage">{load?<iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:<button onClick={()=>setLoad(true)}><Play fill="currentColor"/><span>Reproducir video</span></button>}</div><div><span className="eyebrow">{institution}</span><h3>{title}</h3><p>{description}</p><a href={url} target="_blank" rel="noreferrer">Ver en YouTube</a></div></article>
}

function time(n:number){if(!Number.isFinite(n))return'0:00';const m=Math.floor(n/60),s=Math.floor(n%60);return`${m}:${String(s).padStart(2,'0')}`}
export function AudioPlayer(){
  const ref=useRef<HTMLAudioElement>(null);const [playing,setPlaying]=useState(false);const [current,setCurrent]=useState(0);const [duration,setDuration]=useState(0);const [volume,setVolume]=useState(1)
  const toggle=()=>{const a=ref.current;if(!a)return;if(a.paused)a.play();else a.pause()}
  const skip=(n:number)=>{if(ref.current)ref.current.currentTime=Math.max(0,Math.min(ref.current.duration||0,ref.current.currentTime+n))}
  return <div className="audio-card"><div className="wave" aria-hidden="true">{Array.from({length:36},(_,i)=><i key={i} style={{height:`${18+(i*17)%54}px`}}/>)}</div><audio ref={ref} src={asset('assets/audio/reflexion_cultura_digital_ia.mp3')} preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onTimeUpdate={e=>setCurrent(e.currentTarget.currentTime)} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)}/>
  <div className="audio-controls"><button className="audio-play" onClick={toggle} aria-label={playing?'Pausar':'Reproducir'}>{playing?<Pause/>:<Play fill="currentColor"/>}</button><button onClick={()=>skip(-10)} aria-label="Retroceder 10 segundos"><RotateCcw/></button><span className="time">{time(current)}</span><input className="seek" type="range" min="0" max={duration||0} step=".1" value={current} aria-label="Progreso del audio" onChange={e=>{if(ref.current)ref.current.currentTime=Number(e.target.value)}}/><span className="time">{time(duration)}</span><button onClick={()=>skip(10)} aria-label="Avanzar 10 segundos"><RotateCw/></button><Volume2/><input type="range" min="0" max="1" step=".05" value={volume} aria-label="Volumen" onChange={e=>{const v=Number(e.target.value);setVolume(v);if(ref.current)ref.current.volume=v}}/><a className="download-icon" href={asset('assets/audio/reflexion_cultura_digital_ia.mp3')} download aria-label="Descargar audio"><Download/></a></div></div>
}
