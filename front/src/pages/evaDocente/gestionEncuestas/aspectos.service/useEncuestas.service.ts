import axios from "axios"
import { Encuesta, InterfacesEncuesta } from "./interfacesEncuesta";
import Config from "@utils/constant.utils";


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

    const startEncuesta= async()=>{
        try {
            
        } catch (error) {
            
        }
    }

    const eliminarEncuesta=async()=>{
        try {
            
        } catch (error) {
            
        }
    }
  return {
    listarEncuesta,
    startEncuesta,
    eliminarEncuesta,
  }
}
