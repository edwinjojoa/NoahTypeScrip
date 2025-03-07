import axios from 'axios';
import Config from "@utils/constant.utils";
import { InterfaceMenuSis, MenusSis } from "./interfaceMenuSis";

export const useMenuSisStore = () => {

    const listarMenuSystem=async(): Promise<MenusSis[]> =>{
        try {
          const {data} = await axios.get<InterfaceMenuSis> (`${Config.urlBase}/menu/menuLis`) ; // Llamada a la API correcta
          return data.dato;    
        } catch (error) {
            console.error(error);
            return [];
        }
     }
  return {
    listarMenuSystem
  }
}
