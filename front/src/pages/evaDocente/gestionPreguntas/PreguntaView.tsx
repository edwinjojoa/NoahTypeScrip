import { useEffect, useState } from "react";
import { usePregunta } from "./Preguntas.service/usePregunta.service"
import { Preguntas } from './Preguntas.service/interfacePregunta';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ActualizarBoton, AddButton, EliminarBoton } from "@components/evaComBotones";
import { usePaginacion } from "@components/common/usePaginacion";
import { useModal } from "@hooks/useModal.hook";
import { PreguntaModal } from "./PreguntaModal";
import { ActualizarPregunta } from "@components/evaComBotones/ActualizarPregunta";

export const PreguntaView = () => {
 const {isOpen, openModal, closeModal }=useModal();
 const {listarPregunta, eliminarPregunta}=usePregunta();
 const [evenPregunta, setPregunta] = useState<Preguntas[]>([]);
 
 
 
 //para que se actualice la tabla 

 const refresPreguntas=async()=>{
    const nuevasPreguntas=await listarPregunta();//se octiene las preguntas actualizadas
    setPregunta(nuevasPreguntas);//actualiza el estado 
 }
 useEffect(() => {
  refresPreguntas();
 }, [])
 
      const { page, rowsPerPage, paginatedData, handleChangePage, handleChangeRowsPerPage, totalRows } =
    usePaginacion(evenPregunta, 5); // 5 es el número de filas por defecto
  return (
    <>
     <Box>
             {/* PASAMOS openModal al botón */}
             <AddButton label="" />
            {/* PASAMOS isOpen y closeModal al modal */}
           <PreguntaModal isOpen={isOpen} closeModal={closeModal}  refrescarDatos={refresPreguntas} />
        </Box>
     <TableContainer component={Paper} sx={{ maxWidth: 700, margin: "auto", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Titulo</b></TableCell>
            <TableCell><b>Subtitulo</b></TableCell>
            <TableCell><b>Imagen</b></TableCell>
            <TableCell><b>Valor</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((preguntas) => (
            <TableRow key={preguntas.id}>
              <TableCell>{preguntas.titulo}</TableCell>
              <TableCell>{preguntas.subtitulo}</TableCell>
              <TableCell>{preguntas.imagen}</TableCell>
              <TableCell>{preguntas.valor}</TableCell>
              <TableCell>{preguntas.estado}</TableCell>
              <TableCell>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <ActualizarPregunta row={preguntas}  refrescarDatos={refresPreguntas}  />
                <EliminarBoton id={preguntas.id} onDelete={async (id) => {
                  await eliminarPregunta(id);
                  refresPreguntas(); // Recargar la lista después de eliminar
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
