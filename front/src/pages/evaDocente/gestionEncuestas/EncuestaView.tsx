import { useEffect, useState } from "react";
import { useEncuestas } from "./aspectos.service/useEncuestas.service"
import { Encuesta } from "./aspectos.service/interfacesEncuesta";
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useModal } from "@hooks/useModal.hook";
import { AddButton } from "@components/evaComBotones";
import { EncuestaModal } from "./EncuestaModal";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";

export const EncuestaView = () => {
    const{listarEncuesta }=useEncuestas();
    const [encuesta, setEncuesta] = useState<Encuesta[]>([]);
    const {isOpen, openModal, closeModal }=useModal();

     // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cantidad de encuestas por página
    

    const refrescarEncuesta = async () => {
        const nuevosEncuestas = await listarEncuesta();  // Obtener las encuestas actualizadas
        setEncuesta(nuevosEncuestas);  // Actualizar el estado local con los nuevas encuestas
      };

        useEffect(() => {
          refrescarEncuesta();  // Llamar al principio para obtener los datos iniciales
        }, []);

 // Calcular total de páginas
 const totalPages = Math.ceil(encuesta.length / itemsPerPage);

 // Obtener encuestas de la página actual
 const paginatedEncuestas = encuesta.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

  return (
    <Box sx={{ padding: 3 }}>
    {/* Botón para agregar encuesta */}
    <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
      <IconButton color="primary" size="large">
        <AddIcon />
      </IconButton>
    </Box>

    {/* Contenedor de tarjetas con paginación */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {paginatedEncuestas.map((evento) => {
        const { id, nombre, fecha_creacion, fecha_inicio, fecha_fin, tipo_encuestas } = evento;
        return (
          <Card key={id} sx={{ width: "300px", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{nombre}</Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de creación: {format(new Date(fecha_creacion), "yyyy-MM-dd")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de inicio: {format(new Date(fecha_inicio), "yyyy-MM-dd HH:mm:ss")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de finalización: {format(new Date(fecha_fin), "yyyy-MM-dd HH:mm:ss")}
              </Typography>
              <Typography variant="body2" color="primary">{tipo_encuestas}</Typography>

              {/* Botón para más detalles */}
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }} fullWidth>
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>

    {/* Paginación */}
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
      <Pagination
        count={totalPages} // Total de páginas
        page={currentPage} // Página actual
        onChange={(_, page) => setCurrentPage(page)} // Cambiar de página
        color="primary"
      />
    </Box>
  </Box>
);
  
}
