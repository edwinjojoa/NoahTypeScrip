import { useEffect, useState } from "react";
import { useOpRespuesta } from "./OpRespuestaService/useOpRespuesta.service"

import Modal from 'react-modal';
import { Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import { Close, SaveOutlined } from "@mui/icons-material";

Modal.setAppElement('#root');

interface OpRespuestaModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refrescarDatos: () => void;
  activeEvent?: { id: number; nombre: string; imagen: string; valor: number; respuestaAdd: string;};
}
export const OpRespuestaModal: React.FC<OpRespuestaModalProps> = ({ isOpen, closeModal,  refrescarDatos, activeEvent }) => {
  const {startOpRespuesta}=useOpRespuesta();

    const [formValues, setFormValues] = useState({
      id: null as number | null,
      nombre: '',
      imagen: '',
      valor:''as string | number,
      respuestaAdd: '',
    });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (activeEvent) {
        setFormValues({
          id: activeEvent.id ?? null,
          nombre: activeEvent.nombre || '',
          imagen: activeEvent.imagen || '',
          valor: activeEvent.valor !== null ? activeEvent.valor : 0, // Convertir null a 0
          respuestaAdd: activeEvent.respuestaAdd || '',
        });
      } else {
        setFormValues({
          id: null as number | null,
          nombre: '',
          imagen: '',
          valor:''as string | number,
          respuestaAdd: '',
        });
      }
    }, [activeEvent]);

      // Manejo de cambio en los inputs del formulario
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

   // Validación básica del formulario
   const validateForm = () => {
    return formValues.nombre.trim() === '' || formValues.valor === null || formValues.valor === undefined;
  };

  // Manejo de envío del formulario
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await startOpRespuesta(formValues);
      refrescarDatos();
      closeModal();
      setFormValues({
        id: null as number | null,
        nombre: '',
          imagen: '',
          valor:'' as string | number,
          respuestaAdd: '',
      });
    } catch (error) {
      console.error('Error al guardar aspecto', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    // aria-labelledby="server-modal-title"
    // aria-describedby="server-modal-description"
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
        {activeEvent ? 'Actualizar Opcion Respuesta' : 'Nueva Opcion Respuesta'}
      </Typography>
   
      <form onSubmit={onSubmit}>
        <TextField
          label="Nombre"
          margin="normal"
          name="nombre"
          value={formValues.nombre}
          onChange={onInputChange}
          fullWidth
        />
        <TextField
          label="Imagen"
          fullWidth
          margin="normal"
          name="imagen"
          value={formValues.imagen}
          onChange={onInputChange}
        />
        <TextField
          label="Valor"
          variant="outlined"
          margin="normal"
          name="valor"
          type="number"
          value={formValues.valor}
          onChange={onInputChange}
          fullWidth
        />
        <TextField
          label="Respuesta Adicional"
          margin="normal"
          name="respuestaAdd"
          value={formValues.respuestaAdd}
          onChange={onInputChange}
          fullWidth
        />

           <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                 {loading ? (
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
  )
}
