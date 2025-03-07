const pool = require('../../../../../database/connexion');

async function crearPregunta(params) {
    try {
        const{titulo, subtitulo, imagen, valor }=params;
        const query=`insert into eva.preguntas(titulo, subtitulo, imagen, valor, estado)
         values ($1, $2, $3, $4,  true)`;
        const resultado= await pool.query(query, [titulo, subtitulo, imagen, valor ]);
        console.log('respuesta', resultado.rows);
        return resultado.rows;  
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}

async function listapregunta() {
    try {
        const query=`select 
		id,
		titulo,
		subtitulo,
		imagen,
		valor,
		CASE 
        WHEN estado=true THEN 'Activo'
        ELSE'Desactivado'END as estado
        from eva.preguntas ORDER BY id DESC`;
        const resultado = await pool.query(query);
        return resultado.rows;   
    } catch (error) {
        console.log('error',error);
    }  
}

async function listaTipoPregnta() {
    try {
      
        const query=`select * from eva.tipo_preguntas`;
        const resultado = await pool.query(query);
        return resultado.rows;
        
    } catch (error) {
        console.log('error',error);
        return false;
    }
    
}

async function buscartipopregunta(tipopreid) {
    console.log('El id de tipo true', tipopreid);
    try {
        const id_tipo_pregunta=tipopreid
        //console.log('El id de tipoPregunta:', id_tipo_pregunta);
        const query=`select * from eva.tipo_preguntas where id=$1`;
       // console.log('Ejecutando consulta:', query, 'Con id:', id_tipo_pregunta);
        const resultado= await pool.query(query,[id_tipo_pregunta]);
        //console.log('Resultado de la consulta:', resultado);
        return resultado.rows.length > 0;
        
    } catch (error) {
        console.log('error',error);
        return false;
    }
}
async function buscarpregunta(preguntaid) {
    try {
        const id=preguntaid
       console.log('lleeega id pregunta', id);
        const query=`select * from eva.preguntas where id=$1`;
        const resultado = await pool.query(query,[id]);
console.log('llega el resultado de id pregunta ', resultado.rows);

return resultado.rows.length > 0 ;
    } catch (error) {
        console.log('error',error);
        return false;
    }
}




async function actualizarPregunta(params) {
    try {
        const{id, titulo, subtitulo, imagen, valor}=params;
        const query=`UPDATE eva.preguntas set titulo=$2, subtitulo=$3, imagen=$4, valor=$5 where id=$1 RETURNING *`
        const result=await pool.query(query,[id,titulo, subtitulo, imagen, valor ])
       console.log('respuesta', result.rows);
        return result.rows;
    } catch (error) {
        console.log('error',error);
    }
    
}
async function eliminarPregunta(preguntaid) {
    try {
        const id=preguntaid;
        const query='DELETE FROM eva.preguntas WHERE id = $1';
        const result= await pool.query(query,[id])
        return result.rows.length>0;

    } catch (error) {
        console.log('error',error);
    }
    
}

async function buscarPreguntaPorAspeto(aspectoid) {
    try {
        const id=aspectoid;

        const query='SELECT * FROM eva.encuestas_preguntas WHERE id_aspecto = $1';
        const result= await pool.query(query,[id]);
       // console.log('respuesta', result.rows);
        return result.rows;
    } catch (error) {
        console.log('error', error); 
    }   
}

module.exports={
    crearPregunta,
    actualizarPregunta,
    eliminarPregunta,
    buscartipopregunta,
    listapregunta,
    buscarpregunta,
    buscarPreguntaPorAspeto,
    listaTipoPregnta
}