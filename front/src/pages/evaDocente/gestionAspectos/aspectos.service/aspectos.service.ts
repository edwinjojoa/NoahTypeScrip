
import axios from 'axios';
import Config from "@utils/constant.utils";
import type { Aspecto, IntercefeAspectos } from './interfaceAspecto';
import Swal from "sweetalert2";



export const useAspectoStore = () => {
  
  //las promesas que llega de la interface que envia el arreglo aspecto y lo envia a aspectoView para listar 
     const listarAspectos=async(): Promise<Aspecto[]> =>{
        try {
          const {data} = await axios.get<IntercefeAspectos>(`${Config.urlBase}/evaDocente/listAspecto`) ; // Llamada a la API correcta
          console.table(data.data); 
          return data.data;    
        } catch (error) {
            console.error(error);
            return [];
        }
     }

     const startAspecto=async(aspectosEvent:any)=>{
      try {
        if(aspectosEvent.id){
          const {data} = await axios.put<IntercefeAspectos> (`${Config.urlBase}/evaDocente/updateAspecto/${aspectosEvent.id}`, aspectosEvent) ;
          console.log('actualizar data',data.data)
          return data.data
        }
        else{
          const {data} = await axios.post<IntercefeAspectos> (`${Config.urlBase}/evaDocente/createAspecto`, aspectosEvent) ;
          console.log('creando aspecto', data.data)
          Swal.fire('Éxito', 'Aspecto creado correctamente', 'success');
        }
      } catch (error) {
        console.error(error);
      }
     }

     const eliminarAspecto = async (id: number) => {
      try {
        await axios.delete(`${Config.urlBase}/evaDocente/deleteAspecto/${id}`);
        console.log(`Aspecto con ID ${id} eliminado`);
      } catch (error) {
        console.error("Error eliminando aspecto", error);
        throw error;
      }
    };



  return{
    listarAspectos,
    startAspecto,
    eliminarAspecto, 
  }
  
}






