import { useEffect, useState } from "react";
import { useEncuestas } from "./aspectos.service/useEncuestas.service"
import { Encuesta } from "./aspectos.service/interfacesEncuesta";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useModal } from "@hooks/useModal.hook";
import { AddButton } from "@components/evaComBotones";
import { EncuestaModal } from "./EncuestaModal";


export const EncuestaView = () => {
    const{listarEncuesta }=useEncuestas();
    const [encuesta, setEncuesta] = useState<Encuesta[]>([]);
    const {isOpen, openModal, closeModal }=useModal();
    

    const refrescarEncuesta = async () => {
        const nuevosEncuestas = await listarEncuesta();  // Obtener las encuestas actualizadas
        setEncuesta(nuevosEncuestas);  // Actualizar el estado local con los nuevas encuestas
      };

        useEffect(() => {
          refrescarEncuesta();  // Llamar al principio para obtener los datos iniciales
        }, []);

  return (
    <>
        <Box>
             {/* PASAMOS openModal al botón */}
             <AddButton label="" onClick={openModal} />
            {/* PASAMOS isOpen y closeModal al modal */}
            {/* <EncuestaModal isOpen={isOpen} closeModal={closeModal}  refrescarDatos={refrescarEncuesta} /> */}
        </Box>
    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: "auto", mt: 6 }}>
    <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Fecha de Creacion</b></TableCell>
            <TableCell><b>Descripción</b></TableCell>
             <TableCell><b>Fecha de Inicio</b></TableCell>
             <TableCell><b>Fecha de finalizacion</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encuesta.map((encuestas) => (
            <TableRow key={encuestas.id}>
              <TableCell>{encuestas.nombre}</TableCell>
              <TableCell>{encuestas.fecha_creacion}</TableCell>
              <TableCell>{encuestas.descripcion}</TableCell>
              <TableCell>{encuestas.fecha_fin}</TableCell>
              <TableCell>{encuestas.fecha_fin}</TableCell>
              <TableCell>{encuestas.tipo_encuestas}</TableCell>
              <TableCell>{encuestas.estado}</TableCell>
              <TableCell>
              {/* <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <ActualizarBoton row={aspecto}  refrescarDatos={refrescarAspectos}  />
                <EliminarBoton id={aspecto.id} onDelete={async (id) => {
                  await eliminarEncuesta(id);
                  refrescarAspectos(); // Recargar la lista después de eliminar
                }} />
              </Box> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </>
  )
}
