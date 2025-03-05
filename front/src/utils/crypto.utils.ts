import CryptoJS from 'crypto-js'

import { Config } from '@utils/constant.utils'

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, Config.secretKey).toString()
}

export const decryptToken = (ciphertext: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, Config.secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Error al desencriptar el token:', error)
    return null
  }
}
