import { useEffect, useState } from "react";
import { useOpRespuesta } from "./OpRespuestaService/useOpRespuesta.service"
import { OpRespuesta } from './OpRespuestaService/InterfaceOpRespuesta';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ActualizarBoton, AddButton, EliminarBoton } from "@components/evaComBotones";
import { useModal } from "@hooks/useModal.hook";
import { OpRespuestaModal } from "./OpRespuestaModal";
import { ActualizarOpRespuesta } from "@components/evaComBotones/ActualizarOpRespuesta";
import { usePaginacion } from "@components/common/usePaginacion";



export const OpRespuestaView = () => {
    const {isOpen, openModal, closeModal }=useModal();
    const {listarOpRespuesta, eliminarOpRespuesta}=useOpRespuesta();
    const [opRespuestas, setCaragaOpRespuesta] = useState<OpRespuesta[]>([])

  ///para actualizar la tabla
  const refrescarOpPrespuesta = async () => {
    const nuevosAspectos = await listarOpRespuesta();  // Obtener los aspectos actualizados
    setCaragaOpRespuesta(nuevosAspectos);  // Actualizar el estado local con los nuevos aspectos
  };

  useEffect(() => {
    refrescarOpPrespuesta();  // Llamar al principio para obtener los datos iniciales
  }, []);

  const { page, rowsPerPage, paginatedData, handleChangePage, handleChangeRowsPerPage, totalRows } =
      usePaginacion(opRespuestas, 5); // 5 es el número de filas por defecto

  return (
    <>
    <Box>
         {/* PASAMOS openModal al botón */}
         <AddButton label="" onClick={openModal} />
        {/* PASAMOS isOpen y closeModal al modal */}
        <OpRespuestaModal isOpen={isOpen} closeModal={closeModal}  refrescarDatos={refrescarOpPrespuesta} />
    </Box>
     <TableContainer component={Paper} sx={{ maxWidth: 700, margin: "auto", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Imagen</b></TableCell>
            <TableCell><b>Valor</b></TableCell>
            <TableCell><b>Respuesta Adicional</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((opRespuesta) => (
            <TableRow key={opRespuesta.id}>
              <TableCell>{opRespuesta.nombre}</TableCell>
              <TableCell>{opRespuesta.imagen}</TableCell>
              <TableCell>{opRespuesta.valor}</TableCell>
              <TableCell>{opRespuesta.respuestaAdd}</TableCell>
              <TableCell>{opRespuesta.estado}</TableCell>
              <TableCell>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <ActualizarOpRespuesta row={opRespuesta}  refrescarDatos={refrescarOpPrespuesta}  />
                <EliminarBoton id={opRespuesta.id} onDelete={async (id) => {
                  await eliminarOpRespuesta(id);
                  refrescarOpPrespuesta(); // Recargar la lista después de eliminar
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
