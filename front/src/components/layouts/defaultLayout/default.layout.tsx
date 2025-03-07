import { Box, Container, CssBaseline } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  let location = useLocation()

  const capitalizaFirstLetter = (string: string) => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  useEffect(() => {
    let currentPage = capitalizaFirstLetter(location.pathname)
    document.title = `${currentPage} | Cesmag`
  }, [])

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* <Container maxWidth="lg" sx={{ mt: 8 }}> */}
        
          {children}
        {/* </Container> */}
      </Box>
    </>
  )
}
