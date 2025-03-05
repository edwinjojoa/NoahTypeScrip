import {  IconButton, Tooltip } from "@mui/material";
import { Aspecto } from "../../pages/evaDocente/gestionAspectos/";
import { AspectosModal } from "../../pages/evaDocente/gestionAspectos/AspectosModal";
import { useModal } from "@hooks/useModal.hook";
import BorderColorIcon from '@mui/icons-material/BorderColor';
interface ActualizarBotonProps {
  row: Aspecto;
  refrescarAspectos: () => void;
}

export const ActualizarBoton: React.FC<ActualizarBotonProps> = ({ row, refrescarAspectos }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
         <Tooltip title="actualizar"  color="primary" onClick={openModal}>
                <IconButton>
                <BorderColorIcon/>  
                </IconButton>
              </Tooltip>
      <AspectosModal isOpen={isOpen} closeModal={closeModal} refrescarAspectos={refrescarAspectos} activeEvent={row} />
    </>
  );
};