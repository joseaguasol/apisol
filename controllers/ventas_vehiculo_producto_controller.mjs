import modelVehiculoProduct from "../models/ventas_vehiculo_producto_model.mjs";

export const createVehiculoProductos = async (req,res) => {
    try {
        const newVehiculoProducto = req.body
        const vehiculoProductos= await modelVehiculoProduct.createVehiculoProduct(newVehiculoProducto)


        
        res.status(200).json(vehiculoProductos);
    } catch (error) {
        res.status(500).json({error:error.message});

    }
}
export const getVehiculosProductos = async (req,res)=> {
    try {
        const getvehiculosproductos = await modelVehiculoProduct.getVehiculoProduct()
        res.status(200).json(getvehiculosproductos)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}