import {  IconButton, Tooltip } from "@mui/material";

import { useModal } from "@hooks/useModal.hook";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Preguntas, PreguntaModal } from "../../pages/evaDocente/gestionPreguntas";
interface ActualizarBotonProps {
  row: Preguntas;
  refrescarDatos: () => void;
}

export const ActualizarPregunta: React.FC<ActualizarBotonProps> = ({ row, refrescarDatos }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
         <Tooltip title="actualizar"  color="primary" onClick={openModal}>
                <IconButton>
                <BorderColorIcon/>  
                </IconButton>
              </Tooltip>
              <PreguntaModal
            isOpen={isOpen}
            closeModal={closeModal}
            refrescarDatos={refrescarDatos} // Cambiar refrescarAspectos por refrescarDatos
            preguntaEvent={row}
          />
    </>
  );
};