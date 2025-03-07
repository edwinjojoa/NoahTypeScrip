import Config from '@utils/constant.utils';
import axios from 'axios';
import { InterfaceOpRespuesta, OpRespuesta } from './InterfaceOpRespuesta';
import Swal from 'sweetalert2';


export const useOpRespuesta= () => {

  const listarOpRespuesta=async():Promise<OpRespuesta[]>=>{
    try {
    const {data}=await axios.get<InterfaceOpRespuesta>(`${Config.urlBase}/evaDocente/listRes`);
    console.table(data.data);
    return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const startOpRespuesta=async(opRespuestEven:any)=>{
    try {
      if(opRespuestEven.id){
        const {data}=await axios.put<InterfaceOpRespuesta>(`${Config.urlBase}/evaDocente/updateRes/${opRespuestEven.id}`,opRespuestEven)
        console.log('actualizar data',data.data)
          return data.data
      }
      else{
        const {data} = await axios.post<InterfaceOpRespuesta> (`${Config.urlBase}/evaDocente/createRes`, opRespuestEven) ;
        console.log('creando Opcion Respuesta', data.data)
        Swal.fire('Éxito', 'Opcion de respuesta creada correctamente', 'success');

      }
    } catch (error) {
      console.error(error);
    }

  }
  const eliminarOpRespuesta= async (id: number) => {
    try {
      console.log("Intentando eliminar ID:", id);
      await axios.delete(`${Config.urlBase}/evaDocente/deleteRes/${id}`);
      console.log(`Opcion Respuesta con ID ${id} eliminado`);
    } catch (error) {
      console.error("Error eliminando Opcion Respuesta", error);
      throw error;
    }
  };

  return {
    listarOpRespuesta,
    startOpRespuesta,
    eliminarOpRespuesta
  }
}
