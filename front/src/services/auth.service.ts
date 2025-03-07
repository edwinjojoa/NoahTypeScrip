import { Config } from '@utils/constant.utils'

export const login = async (nombre_usuario: string, clave_acceso: string) => {
  const url = `${Config.urlBase}/login/onlogin`
  console.log('variables', nombre_usuario, clave_acceso);
  
  const response = await fetch(url, { method: 'POST',
  body: JSON.stringify({ nombre_usuario, clave_acceso }),
  headers: { 'Content-Type': 'application/json' }
  })
//console.log('ffffff',response);

  if (!response.ok) {
    const error = await response.json()

    throw new Error(error.message)
  }
  return response.json()
};


