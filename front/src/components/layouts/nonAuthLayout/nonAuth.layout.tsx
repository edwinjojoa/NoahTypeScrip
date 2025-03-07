import { Box,  CssBaseline } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


interface NonAuthLayoutProps {
  children: ReactNode
}

export const NonAuthLayout = ({ children }: NonAuthLayoutProps) => {
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
      <Box sx={{ dispaly: "flex" }}>
       
          {children}
       
      </Box>
    </>
  )
}
