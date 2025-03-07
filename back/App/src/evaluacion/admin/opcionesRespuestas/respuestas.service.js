const { query } = require('express');
const pool = require('../../../../../database/connexion');

async function crearRespuesta(params) {
    try {
        const {nombre, imagen, valor,  respuestaadd }=params;
        const query=(
        `INSERT INTO eva.opciones_respuestas(nombre, imagen, valor,  "respuestaAdd", estado) 
        VALUES ( $1, $2, $3, $4, true)`);
        const result = await pool.query(query,[nombre, imagen, valor,  respuestaadd]);
        console.log('respuesta', result.rows);
        
        return result.rows;
        
    } catch (error) {
        console.log('error',error);
    }
}
async function listarRespuestas(params) {
    try {
        const query=`	SELECT 
                id,			
                nombre,
                imagen, 
                valor,
                "respuestaAdd",
								CASE 
	              WHEN estado = true THEN 'Activo'
	              ELSE 'Desactivado'
							 END as estado
               from eva.opciones_respuestas 
               order by id DESC`
        const result= await pool.query(query)
        //console.log('respuesta',result.rows);
        return result.rows;
        
    } catch (error) {
        console.log('error',error);
    }
    
}
async function buscarRespuesta(idrespuesta) {
    try {
        const id=idrespuesta;
        const query='select * from eva.opciones_respuestas where id=$1';
        const result=await pool.query(query,[id]);
        console.log('respuesta', result.rows);
        
        return result.rows.length > 0;
        
    } catch (error) {
        console.log('error',error);
    }
    
}

async function actualizarRespuestas(params) {
    console.log('lllega datos de actualizaar ',params);
    
    try {
        const{id, nombre, imagen, valor,  respuestaadd} =params;
        const query=`UPDATE eva.opciones_respuestas SET nombre=$2, imagen=$3, valor=$4,  "respuestaAdd"=$5 where id=$1 RETURNING *`;
        const result= await pool.query(query,[id, nombre, imagen, valor,  respuestaadd]);
        console.log('respuesta',result.rows);
        
        return result.rows
        
    } catch (error) {
        console.log('error',error);
    } 
}

async function eliminarRespuesta(id) {
    try { 
        const query='delete  from eva.opciones_respuestas WHERE id=$1';
        const result=await pool.query(query,[id]);
       ///console.log('respuesta', result.rows); 
        return result.rows;
        
    } catch (error) {
        console.log('error',error);
    }
}

async function respuestaPorPregunta(preguntaid) {
    try {
        const id=preguntaid;
        const query='SELECT * from eva.encuestas_preguntas where id_pregunta=$1';
        const result= await pool.query(query,[id]);
        console.log('repuesta', result.rows);
        return result.rows
    } catch (error) {
        console.log('error', error);
        
    }
}

module.exports={
    actualizarRespuestas,
    crearRespuesta,
    listarRespuestas,
    buscarRespuesta,
    eliminarRespuesta,
    respuestaPorPregunta
}