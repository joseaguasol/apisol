import { db_pool } from "../config.mjs";

const modelUbicacion = { 
    createUbicacion :async(ubicacion) => {
        
        try {
            const ubicaciones = await db_pool.one('INSERT INTO relaciones.ubicacion(latitud,longitud,direccion,cliente_id,cliente_nr_id,distrito) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [ubicacion.latitud,ubicacion.longitud,ubicacion.direccion,ubicacion.cliente_id,ubicacion.cliente_nr_id,ubicacion.distrito])
            return ubicaciones

        } catch (error) {
            throw new Error(`Error de inserción : ${error}`)
        }
       

    },
    getUbicacion : async() => {
        try {
            const ubicaciones = await db_pool.any('SELECT * FROM relaciones.ubicacion')
            console.log("ubicaciones")
            console.log(ubicaciones)
            return ubicaciones
        } catch (error) {
            throw new Error(`Error conseguir ${error}`)
        }
    }
}
export default modelUbicacion