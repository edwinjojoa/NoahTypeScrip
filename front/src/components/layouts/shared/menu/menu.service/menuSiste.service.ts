import axios from "axios"

import Config from "@utils/constant.utils";
import { InterfaceMenuSis, MenusSis } from "./interfaceMenuSis";



export const useMenuSisStore = () => {
    const listarMenuSystem=async(): Promise<MenusSis[]>=>{
        try {
            
            const {data}=await axios.get<InterfaceMenuSis>(`${Config.urlBase}/menu/menuLis`);
            console.log('data llegoo',data.dato);
            return data.dato
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    return {
        listarMenuSystem,
        
      }
}