import axios from "axios"
import { Encuesta, InterfacesEncuesta } from "./interfacesEncuesta";
import Config from "@utils/constant.utils";
import Swal from "sweetalert2";


export const useEncuestas = () => {
    const listarEncuesta=async(): Promise<Encuesta[]>=>{
        try {
            
            const {data}=await axios.get<InterfacesEncuesta>(`${Config.urlBase}/evaDocente/listEncuesta`);
            console.log('data llegoo',data.data);
            return data.data
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const startEncuesta= async(encuestasEvent:any)=>{
        try {
            if(encuestasEvent.id){
                const {data} = await axios.put<InterfacesEncuesta> (`${Config.urlBase}/evaDocente/updateEncuesta/${encuestasEvent.id}`, encuestasEvent) ;
                console.log('actualizar data',data.data)
                return data.data
              }
              else{
                const {data} = await axios.post<InterfacesEncuesta> (`${Config.urlBase}/evaDocente/createEncuesta`, encuestasEvent) ;
                console.log('creando Encuesta', data.data)
                Swal.fire('Éxito', 'Encuesta creada correctamente', 'success');
              }
        } catch (error) {
            console.error(error);
        }
    }

    const eliminarEncuesta=async(id:number)=>{
        try {
            await axios.delete(`${Config.urlBase}/evaDocente/deleteAspecto/${id}`);
            console.log(`Aspecto con ID ${id} eliminado`);
        } catch (error) {
            console.error("Error eliminando encuesta", error);
            throw error;
        }
    }
  return {
    listarEncuesta,
    startEncuesta,
    eliminarEncuesta,
  }
}
