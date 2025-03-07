
import { Login } from '../pages/Auth'

import { Home } from '../pages/Dashboard'
import { Profile } from '../pages/User'

import { NotFound } from '../pages/Error'

import { Details } from '../pages/Surveys'
import { AspectoView } from '../pages/evaDocente/gestionAspectos/AspectoView'
import { PreguntaView } from '../pages/evaDocente/gestionPreguntas/PreguntaView'
import { OpRespuestaView } from '../pages/evaDocente/gestionOpcRespuesta/OpRespuestaView'
import { EncuestaView } from '../pages/evaDocente/gestionEncuestas'



const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '/404', component: <NotFound /> },
]

const privateRoutes = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/gestionEncuestas', component: <AspectoView /> },
  { path: '/preguntas', component: <PreguntaView/> },
  { path: '/opcione/respuestas', component: <OpRespuestaView/> }, 
  { path: '/encuestas', component: <EncuestaView/> },
  { path: '/user/profile', component: <Profile /> },
  { path: '/survey/detail/:id/:name', component: <Details /> },
]

export { publicRoutes, privateRoutes }
