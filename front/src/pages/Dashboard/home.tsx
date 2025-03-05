import { useAuth } from '@contexts/auth.context'
import { useNavigate } from 'react-router-dom'

import { usePathname } from '@hooks/usePathname.hook'
import { useRouter } from '@hooks/uesRouter.hook'

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
    </>
  )
}

export default Home
