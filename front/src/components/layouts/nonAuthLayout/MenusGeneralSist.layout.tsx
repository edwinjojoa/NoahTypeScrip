import { Box, Container, CssBaseline } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from './menu/SideBar';



//import { SideBar } from '@components/menu/SideBar';
const drawerWidth:number=290;



interface NonAuthLayoutProps {
  children: ReactNode
}

export const MenusGeneralSist = ({ children }: NonAuthLayoutProps) => {
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
    
    
    <SideBar/>
     <CssBaseline />
      <Box sx={{ dispaly: "flex" }}>
       
          {children}
       
      </Box>
    </>
  )
}
