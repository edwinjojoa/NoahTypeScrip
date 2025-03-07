import { IconButton, Tooltip } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { OpRespuesta } from "pages/evaDocente/gestionOpcRespuesta/OpRespuestaService/InterfaceOpRespuesta";
import { useModal } from "@hooks/useModal.hook";
import { OpRespuestaModal } from "../../pages/evaDocente/gestionOpcRespuesta";

interface ActualizarBotonProps {
  row: OpRespuesta;
  refrescarDatos: () => void;
}
export const ActualizarOpRespuesta : React.FC<ActualizarBotonProps> = ({ row, refrescarDatos }) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
         <Tooltip title="actualizar"  color="primary" onClick={openModal}>
                <IconButton>
                <BorderColorIcon/>  
                </IconButton>
              </Tooltip>
              <OpRespuestaModal
            isOpen={isOpen}
            closeModal={closeModal}
            refrescarDatos={refrescarDatos} // Cambiar refrescarAspectos por refrescarDatos
            activeEvent={row}
          />
    </>
  )
}
