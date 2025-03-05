import { Close, SaveOutlined } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useAspectoStore } from "./aspectos.service/aspectos.service";

Modal.setAppElement('#root');

interface AspectosModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refrescarAspectos: () => void;
  activeEvent?: { id: number; nombre: string; descripcion: string };
}

export const AspectosModal: React.FC<AspectosModalProps> = ({ isOpen, closeModal, refrescarAspectos, activeEvent }) => {
  const { startAspecto } = useAspectoStore();
  const [formValues, setFormValues] = useState({
    id: null as number | null,
    nombre: '',
    descripcion: '',
  });
  const [loading, setLoading] = useState(false);

  // Llenar el formulario con los datos de la fila seleccionada (activeEvent)
  useEffect(() => {
    if (activeEvent) {
      setFormValues({
        id: activeEvent.id ?? null,
        nombre: activeEvent.nombre || '',
        descripcion: activeEvent.descripcion || '',
      });
    } else {
      setFormValues({
        id: null as number | null,
        nombre: '',
        descripcion: '',
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
    return formValues.nombre.trim() === '' || formValues.descripcion.trim() === '';
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
      await startAspecto(formValues);
      refrescarAspectos();
      closeModal();
      setFormValues({
        id: null as number | null,
        nombre: '',
        descripcion: '',
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
        {activeEvent ? 'Actualizar Aspecto' : 'Nuevo Aspecto'}
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nombre"
          value={formValues.nombre}
          onChange={onInputChange}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          margin="normal"
          name="descripcion"
          value={formValues.descripcion}
          onChange={onInputChange}
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
  );
};