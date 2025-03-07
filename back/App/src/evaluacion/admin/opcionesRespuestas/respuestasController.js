
const{response}=require('express');
const Respuesta=require('./respuestas.service')
const Pregunta= require('../preguntas/preguntas.service');

const getRespuestas=async(req, res=response)=>{
    try {
        const params=req.body;
        const result= await Respuesta.listarRespuestas();

        return res.status(200).json({msg:'respuestas', data:result});
    } catch (error) {
        res.json({
            ok:false,
            msg:'no hay respuestas'
        })
    }
  
}
const crearRespuestas=async(req, res)=>{
    try {
        const params=req.body;
        const result= await Respuesta.crearRespuesta(params);
        return res.status(200).json({msg:'respuesta creada', data:result});
    } catch (error) {
        res.json({
            ok:false,
            msg:'no se pudo crear respuesta',
            result
        })
    }
}
const actualizarRespuestas=async(req, res)=>{
    try {
        const params=req.body;
       
        const idrespuesta=params.id; 
        // const preguntaid = Number(params.id_pregunta );
        // //console.log('params zulllyy',preguntaid);
        // if (!preguntaid) {
            
        //     return res.status(400).json({msg: "id_pregunta no es válido"});
        // }
        const existeidRespu= await Respuesta.buscarRespuesta(idrespuesta);
        // const existeidPreg= await Pregunta.buscarpregunta(preguntaid);
        //console.log('pregunta iddd',existeidPreg);

        if(!existeidRespu){
            return res.status(404).json({msg:'no existe Respuesta'})
            //return res.status(404).json({msg:'no existe pregunta para asociar'});
        }else {
            const result=await Respuesta.actualizarRespuestas(params);
            return res.status(200).json({msg:'actualizada respuesta', data:result})
        }
        
        
       
        
    } catch (error) {
        res.status(500).json({
            ok:true,
            msg:'actualizar respuesta'
        })
    }
}
const eliminarRespuestas=async(req, res)=>{
    try {
        
        const params=req.body;

         
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ msg: "ID inválido" });
        } 

      //  const preguntaid= params.id_preguntas
        const existeidRespu= await Respuesta.buscarRespuesta(id);
       // const existeidPreg= await Pregunta.buscarpregunta(preguntaid);
        
        const result=await Respuesta.eliminarRespuesta(id);
        if(!existeidRespu){
            return res.status(404).json({msg:'no existe Respuesta'})
        }  
        return res.status(200).json({msg:'eliminada respuesta', data:result})
        
    } catch (error) {
        res.json({ok:false,msg:'el id no existe  respuesta' }) 
    }
}
module.exports={
    getRespuestas,
    crearRespuestas,
    actualizarRespuestas,
    eliminarRespuestas
}