const { Usuarios } = require('../classes/usuarios');
const usuarios = new Usuarios();

module.exports = {
    start: function (io) {
        io.on("connect", (client) => {
            client.on("notif", (data) => {
                console.log("hola")
                io.to(data.userid).emit('notif', data);
            })
            client.on("chat", (data) => {
                console.log(data)
                io.to(data.userid).emit('chat', data);
            })
            io.on('connection', function (socket) {


            });
            client.emit("Bienvenida", {
                usuario: "administrador",
                mensaje: "Bienvenido al servidor"
            })

            client.on("disconnect", () => {
                console.log("Usuario desconectado")
                usuarios.borrarSocket(client.id);
            })

            client.on("enviarMensajeP", (data) => {
                console.log(usuarios.getUserSockets(data.userid))
                io.to(data.userid).emit('enviarMensaje', data);
            })

            client.on("enviarMensaje", (data) => {

                client.broadcast.emit("enviarMensaje", usuarios.getSockets())
            })
            client.on("conectado", (data, callback) => {
                client.join(data.userid);
                console.log(data)
                usuarios.agregarPersona(client.id, data.userid);

                client.broadcast.emit("enviarMensaje", data)
                client.broadcast.emit("enviarMensaje", client.id)

            })

        });
    }
}