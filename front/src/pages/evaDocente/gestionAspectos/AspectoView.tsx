import { useEffect, useState } from "react";
import { useAspectoStore } from "./aspectos.service/aspectos.service"
import { Aspecto } from "./aspectos.service/interfaceAspecto";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from "@mui/material";
import { AspectosModal } from "./AspectosModal";
import { useModal } from "@hooks/useModal.hook";
import { AddButton } from "@components/evaComBotones";
import { ActualizarBoton } from "@components/evaComBotones/ActualizarBoton";
import { EliminarBoton } from "../../../components/evaComBotones";
import { usePaginacion } from "@components/common/usePaginacion";



export const AspectoView = () => {
  const {isOpen, openModal, closeModal }=useModal();
  const {listarAspectos, eliminarAspecto}=useAspectoStore();
  const [aspectos, setAspectos] = useState<Aspecto[]>([])
 
 
  ///para actualizar la tabla
  const refrescarAspectos = async () => {
    const nuevosAspectos = await listarAspectos();  // Obtener los aspectos actualizados
    setAspectos(nuevosAspectos);  // Actualizar el estado local con los nuevos aspectos
  };

  useEffect(() => {
    refrescarAspectos();  // Llamar al principio para obtener los datos iniciales
  }, []);

 
  
    const { page, rowsPerPage, paginatedData, handleChangePage, handleChangeRowsPerPage, totalRows } =
    usePaginacion(aspectos, 5); // 5 es el número de filas por defecto
  return (
    <>
    <Box>
         {/* PASAMOS openModal al botón */}
         <AddButton label="" onClick={openModal} />
        {/* PASAMOS isOpen y closeModal al modal */}
        <AspectosModal isOpen={isOpen} closeModal={closeModal}  refrescarDatos={refrescarAspectos} />
    </Box>
     <TableContainer component={Paper} sx={{ maxWidth: 700, margin: "auto", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Descripción</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((aspecto) => (
            <TableRow key={aspecto.id}>
              <TableCell>{aspecto.nombre}</TableCell>
              <TableCell>{aspecto.descripcion}</TableCell>
              <TableCell>{aspecto.estado}</TableCell>
              <TableCell>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <ActualizarBoton row={aspecto}  refrescarDatos={refrescarAspectos}  />
                <EliminarBoton id={aspecto.id} onDelete={async (id) => {
                  await eliminarAspecto(id);
                  refrescarAspectos(); // Recargar la lista después de eliminar
                }} />
              </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     {/* Agregando paginación */}
     <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Páginas" // EN ESPAÑOL
        />
    </TableContainer>
    </>
  )
}
