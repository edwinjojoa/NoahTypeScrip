import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"


export const SiberBar = () => {
  return (
    <Box

    component='nav'
    sx={{width: {sm: drawerWidth}, flexShrink:{sm:0 }}}
    >
        <Drawer
         variant="permanent"
         open
         sx={{display: {sx: 'block'},
          '& .MuiDrrawer-paper':{ boxSizing: 'border-box', whidth: drawerWidth}
        }}
        >
        </Drawer>
        <Toolbar>
          <Typography variant="h9" noWrap component='div'>
            {user.nombre}
          </Typography>
          <Divider/>
        </Toolbar>
        <List>
          {
          [ 'Administrar Pagos','Admón.Prácticas','Consultorio Jurídico','Eventos','Gestion de Notas','Matriculas', 'Evaluación Docente'].map (text =>(
            <ListItem key={text} disablePadding>
              <ListItemButton >
              
                <ListItemIcon>
                <TurnedInNot/>
                </ListItemIcon>
              <Grid2 container>
                 <ListItemText primary={text}/>
                 <ListItemText secondary={''}/>
              </Grid2>
              </ListItemButton>
            </ListItem>
          ))
          }

        </List>
    </Box>
    
  )
}
