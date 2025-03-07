import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from '../../hooks'
import { useAuth } from '@contexts/auth.context'
import { login as loginService } from '@services/auth.service'

import { Alert, Box, Button, Card, CardContent, CardMedia, FormControl, TextField, Typography } from '@mui/material'

import cedeCentroCESMAG from './../../assets/img/SedeCentroUCESMAG.webp';
import { AuthVistaGeneral } from './layout/AuthVistaGeneral'

const Login = () => {


   const [emailError, setEmailError] = useState(false)
   const [emailErrorMessage, setEmailErrorMessage] = useState('')
   const [loginError, setLoginError] = useState('')
   const [passwordError, setPasswordError] = useState(false)
   const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
   const { login } = useAuth()

   const initialForm = {
      nombre_usuario: '',
      clave_acceso: ''
   }

   const [{ nombre_usuario, clave_acceso }, handleInputChange] = useForm(initialForm);

   const navigate = useNavigate();

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();
      if (validateInputs()) {
         setLoading(true);
         try {
            const response = await loginService(nombre_usuario, clave_acceso)

            const { token } = response
            login(token)
            navigate('/home')
         } catch (e) {
            setLoginError('Usuario y contraseña incorrectos.');
            setLoading(false);
         }
      }
   }

   const validateInputs = () => {
      let isValid = true
      // Validación de email
      if (nombre_usuario.length < 3) {
         setEmailError(true);
         setEmailErrorMessage('El nombre de usuario es inválido.');
         isValid = false;
      } else {
         setEmailError(false);
         setEmailErrorMessage('');
      }
      // Validación de contraseña
      if (clave_acceso.length < 5) {
         setPasswordError(true);
         setPasswordErrorMessage('La contraseña no cumple con las políticas de seguridad.');
         isValid = false;
      } else {
         setPasswordError(false);
         setPasswordErrorMessage('');
      }
      // console.log('Validación:', isValid);
      return isValid;
   };

   const [loading, setLoading] = useState(false);

   return (
      <>
      <AuthVistaGeneral titulo='Inicio de sesión' >
         <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "400px",
              gap: 2,  
            }}>
{/* 
            <Card sx={{ display: 'flex' }}>

               <CardMedia
                  component="img"
                  sx={{ width: { xs: 0, sm: 0, md: 300, lg: 400, xl: 400 } }}
                  image={cedeCentroCESMAG}
                  alt="Live from space album cover"
               /> */}

              
{/* 
                        <Box>
                           <Typography variant='h5' mb={1}>
                              Sistema Académico
                           </Typography>

                           <Typography>
                              Bienvenido, por favor inicie sesión en su cuenta.
                           </Typography>
                        </Box> */}


                        <FormControl>
                           <TextField
                              autoComplete="email"
                              autoFocus
                              color={emailError ? 'error' : 'primary'}
                              error={emailError}
                              helperText={emailErrorMessage}
                              id="nombre_usuario"
                              label="Correo Institucional"
                              name='nombre_usuario'
                              onChange={handleInputChange}
                              placeholder="usuario@unicesmag.edu.co"
                              required
                              type="email"
                              value={nombre_usuario}
                              variant="outlined"
                           />
                        </FormControl>

                        <FormControl>
                           <TextField
                              autoComplete="current-password"
                              autoFocus
                              color={passwordError ? 'error' : 'primary'}
                              error={passwordError}
                              helperText={passwordErrorMessage}
                              id='clave_acceso'
                              label="Contraseña"
                              name='clave_acceso'
                              onChange={handleInputChange}
                              placeholder="••••••"
                              required
                              type="password"
                              value={clave_acceso}
                              variant="outlined"
                           />
                        </FormControl>

                        {
                           loginError.length > 0 && (
                              <Alert severity="error"><strong>{loginError}</strong></Alert>
                           )
                        }

                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recordar mi" /> */}

                        <FormControl>
                           <Button
                              loading={loading}
                              loadingPosition="center"
                              type="submit"
                              variant="contained"
                           >
                              Iniciar Sesión
                           </Button>
                        </FormControl>

                        <FormControl sx={{ display: 'inline-block' }}>
                           <Link
                              style={{ textDecoration: 'none' }}
                              to={{
                                 pathname: '/forgotPassword',
                                 search: `?email=??????`,
                                 hash: '#hash',
                              }}
                           >
                              Recordar contraseña

                           </Link>
                           
                        </FormControl>

                   
             
            {/* </Card> */}

         </Box>
         </AuthVistaGeneral>
      </>
   )
}

export default Login
