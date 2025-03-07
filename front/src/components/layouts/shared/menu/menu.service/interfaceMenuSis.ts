export interface InterfaceMenuSis {
    ok:   boolean;
    msg:  string;
    dato: MenusSis[];
}

export interface MenusSis {
    id:                string;
    id_menu:           number | null;
    ruta:              null | string;
    titulo:            string;
    icono:             string;
    clase:             null | string;
    enlace_externo:    boolean;
    descripcion:       null | string;
    direccion_ip:      null;
    dispositivo_movil: boolean;
    metodos:           null | string;
}
