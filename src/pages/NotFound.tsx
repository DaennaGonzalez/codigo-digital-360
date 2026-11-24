import { Link } from 'react-router-dom'
export default function NotFound(){return <section className="not-found"><span>404</span><h1>Esta ruta no forma parte del recorrido</h1><p>La página que buscas no existe o cambió de dirección.</p><Link className="button primary" to="/">Volver al inicio</Link></section>}
