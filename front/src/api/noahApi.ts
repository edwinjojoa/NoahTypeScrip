import axios, { InternalAxiosRequestConfig } from 'axios';
import { getEvaVariables } from '../utils/getEvaVariables';

const { VITE_API_URL } = getEvaVariables();

// Verificamos que la URL no sea undefined
if (!VITE_API_URL) {
  throw new Error("VITE_API_URL no está definida en las variables de entorno.");
}

const noahApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <tu_token>', // Si usas autenticación basada en tokens
  },
});

// Configuración del interceptor para agregar el token al header
noahApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('token'); // Obtener token de sessionStorage
    if (token) {
      config.headers['x-token'] = token; // Agregar el token a los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default noahApi;
