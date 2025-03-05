import { jwtDecode } from 'jwt-decode'

interface user {
  nombre: string
  // email: string
  // role: string
  // pic: string
}

export const decodeJwt = (token: string): user | null => {
  try {
    const decoded: any = jwtDecode(token)
    console.log('Token decodificado:', decoded)
    return {
      nombre: decoded.nombre || '',
      // email: decoded.email || '',
      // role: decoded.role || '',
      // pic: decoded.pic || '',
    }
  } catch (error) {
    return null
  }
}
