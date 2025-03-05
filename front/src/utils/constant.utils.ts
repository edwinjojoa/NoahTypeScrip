const urlBase = import.meta.env.VITE_API_URL
const secretKey = import.meta.env.VITE_CRYPTO_SECRET

export const Config = {
  urlBase: urlBase,
  secretKey: secretKey,
}

export default Config