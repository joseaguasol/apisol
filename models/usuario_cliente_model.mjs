import { db_pool } from "../config.mjs";
import bcrypt from 'bcrypt';

const modelUserCliente = {
    createUserCliente: async (cliente) => {
        const client = await db_pool.connect();
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        try {
            console.log("cliente")
            console.log(cliente)

            const UsuarioExistente = await db_pool.oneOrNone(`SELECT * FROM personal.usuario WHERE nickname=$1`,
                [cliente.nickname])
            console.log("usuarioexistente")
            console.log(UsuarioExistente)

            if (UsuarioExistente) {
                return { "message": "Usuario ya existente, intente otro por favor. " }
            }
            else {
                console.log("usuario nuevo")

                const hashedPassword = await bcrypt.hash(cliente.contrasena, 10);
                // Inicia una transacción
                const result = await client.tx(async (t) => {
                    const usuario = await t.one('INSERT INTO personal.usuario (rol_id, nickname, contrasena, email) VALUES ($1, $2, $3, $4) RETURNING *',
                        [cliente.rol_id, cliente.nickname, hashedPassword, cliente.email]);

                    console.log("usuario");
                    console.log(usuario);
                    console.log("id usuario");
                    console.log(usuario.id);

                    let code = '';

                    for (let i = 0; i < 5; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        code += characters.charAt(randomIndex);
                    }
                    
                    console.log("codigo....");
                    console.log(code);


                    const clientes = await t.one('INSERT INTO ventas.cliente (usuario_id, nombre, apellidos, fecha_nacimiento, sexo, direccion, dni, codigo, saldo_beneficios, telefono, direccion_empresa, suscripcion, RUC, nombre_empresa, frecuencia, zona_trabajo_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
                        [usuario.id, cliente.nombre, cliente.apellidos, cliente.fecha_nacimiento, cliente.sexo, cliente.direccion, cliente.dni, code, 0.0, cliente.telefono, cliente.direccion_empresa, cliente.suscripcion, cliente.RUC, cliente.nombre_empresa, cliente.frecuencia, cliente.zona_trabajo_id]);

                    console.log("cliente");
                    console.log(clientes);

                    return { usuario, clientes }
                });
                return result
            }
        }
        catch (e) {
            throw new Error(`Error query create:${e}`)
        } finally {
            // Asegúrate de liberar la conexión al finalizar
            client.done();
        }
    },
    updateUserCliente: async (id, cliente) => {

        try {
            const usuario = await db_pool.oneOrNone('UPDATE personal.usuario SET rol_id = $1, nickname = $2, contrasena = $3, email = $4 WHERE id = $5 RETURNING *',
                [cliente.rol_id, cliente.nickname, cliente.contrasena, cliente.email, id]);

            if (!usuario) {
                throw new Error(`No se encontró un usuario con ID ${id}.`);
            }

            const cliente = await db_pool.one('UPDATE ventas.cliente SET nombre=$1, apellidos=$2, fecha_nacimiento=$3, sexo=$4, direccion=$5, dni=$6, codigo=$7, saldo_beneficios=$8, direccion_empresa=$9, suscripcion=$10, ubicacion=$11, RUC=$12, nombre_empresa=$13, zona_trabajo_id=$14 WHERE usuario_id = $15 RETURNING *',
                [cliente.nombre, cliente.apellidos, cliente.fecha_nacimiento, cliente.sexo, cliente.direccion, cliente.dni, cliente.codigo, cliente.saldo_beneficios, cliente.direccion_empresa, cliente.suscripcion, cliente.ubicacion, cliente.RUC, cliente.nombre_empresa, cliente.zona_trabajo_id, id]);
            console.log("dentro de model 2do update", id)
            return { usuario, administrador }
        } catch (error) {
            throw new Error(`Error en la actualización del administrador: ${error.message}`);
        }
    },
    getUsersCliente: async () => {
        try {
            const userClients = await db_pool.any('select * from personal.usuario inner join ventas.cliente on personal.usuario.id = ventas.cliente.usuario_id;')
            return userClients
        } catch (e) {
            throw new Error(`Error query clients: ${err}`);
        }
    },
    deleteUserCliente: async (id) => {
        try {
            const result = await db_pool.result('DELETE FROM personal.usuario WHERE ID = $1', [id]);
            return result.rowCount === 1; // Devuelve true si se eliminó un registro, false si no se encontró el registro
        } catch (error) {
            throw new Error(`Error en la eliminación del cliente: ${error.message}`);
        }
    },
    existCodeCliente : async(codigo) => {
        try {
            const existCodigo = await db_pool.oneOrNone(`SELECT codigo FROM ventas.cliente WHERE codigo=$1`,
            [codigo]);
            if(existCodigo){
                console.log(existCodigo)
                const saldo = await db_pool.oneOrNone(`SELECT saldo_beneficios FROM ventas.cliente WHERE codigo=$1`,[
                    existCodigo
                ])
                const nuevoSaldo = saldo.saldo_beneficios + 2.00

                await db_pool.oneOrNone(`UPDATE ventas.cliente SET saldo_beneficios= $1 WHERE codigo = $2`,[nuevoSaldo,existCodigo])
                return true
            }
            else{
                console.log(existCodigo)
                return false
            }
            
        } catch (error) {
            throw new Error(`Error query verify code ${error}`)
        }
    }
}
export default modelUserCliente;
