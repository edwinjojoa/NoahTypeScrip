
import { AddOutlined } from "@mui/icons-material";
import { Box, Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
    label: string;
  }

export const AddButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
   


  return ( 
    <Box
    display="flex"
    justifyContent="flex-end" // Alinea a la derecha
    alignItems="center" // Centra verticalmente
    sx={{ width: "100%", paddingRight: 2 }} // Asegura que ocupe todo el ancho disponible
    >

    
    <Button 
    color="primary" 
    size="medium" 
    sx={{
      width: 46, // Tamaño estándar de un FAB mediano
      height: 46, 
      minWidth: 46,
      borderRadius: "50%", // Asegura que siempre sea redondo
      boxShadow: 3, // Agrega una ligera sombra
    }}{...props}
    >
      {label}
     <AddOutlined fontSize="medium" />
    </Button>
    </Box>
    )
  


};
import React from 'react'


