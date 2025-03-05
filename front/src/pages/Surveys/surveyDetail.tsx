import { useAuth } from '@contexts/auth.context'
import { useNavigate, useParams } from 'react-router-dom'

import { usePathname } from '@hooks/usePathname.hook'
import { useRouter } from '@hooks/uesRouter.hook'

const Details = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const pathname = usePathname()

  const router = useRouter()

  const { id, name } = useParams()

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <h1>Home | {pathname}</h1>
      <hr />
      <h1>Encuesta numero: {id}</h1>
      <hr />
      <h1>Encuesta nombre: {name}</h1>
      <button onClick={handleClick}>Salir</button>
      <button onClick={handleBack}>Atras</button>
      <button onClick={() => router.forward()}>Adelante</button>
    </>
  )
}

export default Details
