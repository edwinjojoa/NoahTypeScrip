export interface InterfaceOpRespuesta {
    msg:  string;
    data: OpRespuesta[];
}

export interface OpRespuesta {
    id:           number;
    nombre:       string;
    imagen:       string;
    valor:        number;
    respuestaAdd: string;
    estado:       Estado;
}

export enum Estado {
    Activo = "Activo",
}
