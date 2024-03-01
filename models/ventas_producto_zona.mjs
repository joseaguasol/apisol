import { db_pool } from "../config.mjs";


const modelProductoZona = {
    createProductoZona:async (productozona) => {
        

        try{
            const ProductoZone = await db_pool.oneOrNone(`INSERT INTO producto_zona (zona_trabajo_id,producto_id,stock_padre)
            VALUES($1,$2,$3)`,
                [productozona.zona_trabajo_id,productozona.producto_id,productozona.stock_padre])
           
            return ProductoZone
          
           
        }
        catch(e){
            throw new Error(`Error query create:${e}`)
        }
    },
    getProductoZona:async () => {
        try {
            const getProductZone = await db_pool.any(`
            SELECT * FROM ventas.producto_zona`)
            return getProductZone
        } catch (error) {
            throw new Error(`Error query get ${error}`)
        }
    }
}
export default modelProductoZona;