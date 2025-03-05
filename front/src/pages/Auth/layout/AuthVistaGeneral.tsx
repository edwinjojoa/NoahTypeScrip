import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './style.css';
import logo from '../../../assets/img/logos_principal/logo_principal.jpeg';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

interface AuthVistaGeneralPros{
    children: React.ReactElement;
    titulo: string;
}

const backgrounds = [
    '/src/assets/img/logos_principal/fondo1.jpeg',
    '/src/assets/img/logos_principal/fondo2.jpeg',
    '/src/assets/img/logos_principal/fondo3.jpeg',
    '/src/assets/img/logos_principal/fondo4.jpeg',
  ];
export const AuthVistaGeneral: React.FC<AuthVistaGeneralPros>= ({children, titulo = ''}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentBackground, setCurrentBackground] = useState(0);
    
    useEffect(() => {
        setIsVisible(true);
        // Cambia la imagen de fondo cada 5 segundos
        const interval = setInterval(() => {
          setCurrentBackground(prev => (prev + 1) % backgrounds.length);
        }, 5000); // Cambiar cada 5 segundos
        return () => clearInterval(interval);
      }, []);
  
      return (
        <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Fondo de pantalla */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('${backgrounds[currentBackground] || backgrounds[0]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 1s ease-in-out",
           // zIndex: -1, // Fondo detrás del contenido
          }}
        />
      

        <Box
  
        
        
          sx={{
            position: "relative",
            zIndex: 1, // Para que el contenido esté sobre la imagen
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            
          
          }}
        >
            
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center"
            sx={{background: "rgba(255, 255, 255, 0.9)",  borderRadius: "10px",width: "450px", }}
            >
                {/* Logo */}
                <img src={logo} alt="User Icon" className="background-logo" />

                {/* Título */}
                <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: "bold" }}>
                    {titulo}
                </Typography>
            


          {children}

          <h5 className='text-center'>Conéctate con nosotros</h5>
                        <div className="social-icons">
                        
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="social-icon" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="social-icon" />
                            </a>
                            <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
                                <FaEnvelope className="social-icon" />
                            </a>
                        </div>
                        </Box>
        </Box>
      </Box>
      
    );
  };