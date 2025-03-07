import { useAuth } from '@contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'

import { usePathname } from '@hooks/usePathname.hook'
import { useRouter } from '@hooks/uesRouter.hook'
import { Button } from '@mui/material'

const Home = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const pathname = usePathname()

  const router = useRouter()

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  const handleBack = () => {
    router.back();
  }

  return (
    <>
      <h1>Home | {pathname}</h1>
      <button onClick={handleClick}>Salir</button>
      <button onClick={handleBack}>Atras</button>
      <button onClick={() => router.forward()}>Adelante</button>
      <Button  component={Link} to="/preguntas">pregunta</Button>
      <Button  component={Link} to="/opcione/respuestas">OpcionesRespuesta</Button>
      <Button  component={Link} to="/encuestas">encuesta</Button>
    </>
  )
}

export default Home
