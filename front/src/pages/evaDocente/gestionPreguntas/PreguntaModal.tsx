import { useEffect, useState } from "react";
import { usePregunta } from "./Preguntas.service/usePregunta.service";
import Modal from 'react-modal';
import { Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import { Close, SaveOutlined } from "@mui/icons-material";


interface PreguntaModalProps {
    isOpen: boolean;
    closeModal: () => void;
    refrescarDatos: () => void;
    preguntaEvent?: { id: number; titulo: string; subtitulo:  string; imagen: string; valor: number | null;  tipopregunta: string};
  }
export const PreguntaModal: React.FC<PreguntaModalProps> = ({isOpen, closeModal, preguntaEvent, refrescarDatos}) => {
    const{startPregunta}=usePregunta();
    const [formValues, setFormValues] = useState({
        id: null as number | null,
        titulo:'',
        subtitulo:'' ,
        imagen:'',
        valor:''as string | number,
    })
 const [caragarPregunta, setCargarPregunta] = useState(false)

 //para llenar el formulario 
 useEffect(() => {
    if(preguntaEvent){
      setFormValues({
            id: preguntaEvent.id ?? null as number | null,
            titulo: preguntaEvent.titulo ||'',
            subtitulo: preguntaEvent.subtitulo ||'' ,
            imagen: preguntaEvent.imagen ||'',
            valor: preguntaEvent.valor !== null ? preguntaEvent.valor : 0, // Convertir null a 0
        });
    }
 
 }, [preguntaEvent])
 
 const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFormValues({
    ...formValues,
    [name]: value,
  });
  };
  const validateForm = () => {
    return formValues.titulo.trim() === '' ;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      alert("campo obligatorio.");
      return;
    }

    setCargarPregunta(true);
    try {
      await startPregunta(formValues);
      refrescarDatos();
      closeModal();
      setFormValues({
        id: null as number | null,
        titulo:'',
        subtitulo:'' ,
        imagen:'',
        valor:'',
      });
    } catch (error) {
      console.error('Error al guardar aspecto', error);
    } finally {
      setCargarPregunta(false);
    }
    }

  return (
    <>
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      ariaHideApp={false} // Desactiva aria-hidden en #root
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          borderRadius: "10px",
          padding: "20px",
          overflow: "visible"
        },
      }}
    >
      <IconButton onClick={closeModal} style={{ position: 'absolute', top: 6, right: 6 }}>
        <Close />
      </IconButton>

      <Typography id="modal-modal-title" variant="h6" component="h2">
        {preguntaEvent ? 'Actualizar Pregunta' : 'Nueva Pregunta'}
      </Typography>

      <form 
      onSubmit={onSubmit}
      >
     <TextField 
            label="Titulo"
            variant="outlined"
            fullWidth
            margin="normal"
            name="titulo"
            value={formValues.titulo || ''}
            onChange={onInputChange}
            // error={formSubmitted && formValues.titulo.trim().length === 0}
            // helperText={formSubmitted && formValues.titulo.trim().length === 0 ? 'El título es obligatorio' : ''}
            />

            <TextField
            label="Subtitulo"
            variant="outlined"
            fullWidth
            margin="normal"
            name="subtitulo"
            value={formValues.subtitulo || ''}
            onChange={onInputChange}
            />
            <Typography>Ingrese la imagen</Typography>

             <TextField
            label="Imagen"
            variant="outlined"
            fullWidth
            margin="normal"
            name="imagen"
            value={formValues.imagen || ''}
            onChange={onInputChange}
            />

           <TextField
            label="Valor"
            variant="outlined"
            fullWidth
            margin="normal"
            name="valor"
            value={formValues.valor || ''}
            onChange={(e) => {
              const value = e.target.value;
              // Convierte el valor a un número entero
              setFormValues({
                ...formValues,
                valor: value === '' ? '' : parseInt(value, 10) || ''// Si el valor es vacío, lo dejamos vacío
              });
          }}
            type="number"
            />
     <Button variant="contained" color="primary" type="submit" fullWidth disabled={caragarPregunta}>
          {caragarPregunta ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            <>
              <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
              Guardar
            </>
          )}
        </Button>
      </form>
    </Modal>
    </>
  )
}
