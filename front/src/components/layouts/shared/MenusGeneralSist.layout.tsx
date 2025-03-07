
import { Box,  CssBaseline } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from './menu/SiderBar'


interface MenusGeneralSistProps {
  children: ReactNode
}

export const MenusGeneralSist = ({ children }: MenusGeneralSistProps) => {
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
     <SideBar/>
      <Box sx={{ dispaly: "flex" }}>
       
          {children}
       
      </Box>
    </>
  )
}
