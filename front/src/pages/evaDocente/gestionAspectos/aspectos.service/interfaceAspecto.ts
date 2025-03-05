export interface IntercefeAspectos {
    ok:   boolean;
    msg:  string;
    data: Aspecto[];
}

export interface Aspecto {
    id:          number;
    nombre:      string;
    descripcion: string;
    aspecto:     string;
    estado:      Estado;
}

export enum Estado {
    Activo = "Activo",
}
