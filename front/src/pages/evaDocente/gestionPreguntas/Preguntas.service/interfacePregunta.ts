export interface InterfacePregunta {

    msg:  string;
    data: Preguntas[];
}

export interface Preguntas {
    id:           number;
    titulo:       string;
    subtitulo:    string;
    imagen:       string;
    valor:        number | null;
    estado:      Estado;
    tipopregunta: string;
}

export enum Estado {
    Activo = "Activo",
}