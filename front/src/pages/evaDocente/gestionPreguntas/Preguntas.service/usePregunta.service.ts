import axios from "axios";
import { InterfacePregunta, Preguntas } from "./interfacePregunta";
import Config from "@utils/constant.utils";
import Swal from "sweetalert2";

export const usePregunta = () => {
   
    const listarPregunta=async():Promise<Preguntas[]> =>{
        try {
            const{data}=await axios.get<InterfacePregunta> (`${Config.urlBase}/evaDocente/listPregunta`);
            console.log('lista pregunta',data.data);
            return data.data;
        } catch (error) {
            console.error(error);
            return[];///necesita retornar un arreglo 
        }
    }

    const startPregunta=async(preguntaEvent:any)=>{
        try {
            if(preguntaEvent.id){
                const {data}=await axios.put<InterfacePregunta>(`${Config.urlBase}/evaDocente/updatePregunta/${preguntaEvent.id}`,preguntaEvent)
                console.log('actualizar data',data.data)
                return data.data
            }
            else{
                const {data}=await axios.post<InterfacePregunta>(`${Config.urlBase}/evaDocente/createPregunta`,preguntaEvent)
                console.log('creando aspecto', data.data)
                Swal.fire('Éxito', 'Aspecto creado correctamente', 'success');

            }
        } catch (error) {
            console.error(error);
        }
    }
    const eliminarPregunta=async(id:number)=>{
        try {
            await axios.delete(`${Config.urlBase}/evaDocente/deletePregunta/${id}`);
            console.log(`eliminado con ID ${id} eliminado`);
          } catch (error) {
            console.error("Error eliminando pregunta", error);
            throw error;
          }
        
    }

  return {
    listarPregunta,
    startPregunta,
    eliminarPregunta,

  }
}
