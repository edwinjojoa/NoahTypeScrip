
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Swal from "sweetalert2"

interface DeleteButtonProps {
    id: number;
    onDelete: (id: number) => Promise<void>; // Función que maneja la eliminación
    disabled?: boolean;
  }

export const EliminarBoton: React.FC<DeleteButtonProps> = ({ id, onDelete, disabled = false }) => {
    const handleDeleteClick = async () => {
        const confirmacion = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        });
    
        if (confirmacion.isConfirmed) {
          try {
            await onDelete(id);
            Swal.fire("Eliminado", "El Registro ha sido eliminado correctamente", "success");
          } catch (error) {
            Swal.fire("Error", "No se pudo eliminar el registro", "error");
          }
        }
      };
 
    return (
    <Tooltip title="Eliminar">
       <IconButton onClick={handleDeleteClick} disabled={disabled} color="error">
        <Delete />
      </IconButton>
    </Tooltip>
  );
};