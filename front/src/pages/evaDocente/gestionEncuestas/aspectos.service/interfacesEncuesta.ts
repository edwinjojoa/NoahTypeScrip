export interface InterfacesEncuesta {
    msg:  string;
    data: Encuesta[];
}

export interface Encuesta {
    id:                number;
    fecha_creacion:    Date;
    nombre:            string;
    descripcion:       string;
    fecha_inicio:      Date;
    fecha_fin:         Date;
    tipo_encuestas:    TipoEncuestas;
    periodo_academico: number;
    llave_abreviatura: LlaveAbreviatura | null;
    estado:            Estado;
}

export enum Estado {
    Deshabilitada = "deshabilitada",
    Habilitada = "habilitada",
}

export enum LlaveAbreviatura {
    Coor = "COOR",
    DoloreSintDebitis = "Dolore sint debitis",
    Evacoor = "EVACOOR",
    Evadocenteprod = "EVADOCENTEPROD",
    Evadocenteprod60 = "EVADOCENTEPROD-60",
    Sico = "SICO",
}

export enum TipoEncuestas {
    Interna = "interna",
}
