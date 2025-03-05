import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeContextProvider } from '@contexts/theme.context.tsx'
import { AuthContextProvider } from '@contexts/auth.context.tsx'

import App from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
