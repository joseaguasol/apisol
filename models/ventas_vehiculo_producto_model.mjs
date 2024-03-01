import { db_pool } from "../config.mjs";

const modelVehiculoProduct = {
    createVehiculoProduct: async (vehiculoproducto) => {
        try {
            const vehiculoproducto = await db_pool.one(`
            INSERT INTO vehiculo_producto (producto_id,vehiculo_id,stock_movil)
            VALUES($1,$2,$3) RETURNING *`,[vehiculoproducto.producto_id,vehiculoproducto.vehiculo_i,vehiculoproducto.stock_movil])
            return vehiculoproducto

        } catch (error) {
            throw new Error(`error query ${error}`)
        }

    },
    getVehiculoProduct:async () =>{
        try {
            const getVehiculoProductos = await db_pool.any(`
            SELECT * FROM vehiculo_producto`)
            return getVehiculoProductos

        } catch (error) {
            throw new Error(`error query ${error}`)
        }
    }

}
export default modelVehiculoProduct