import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import io from "socket.io-client";
import SideBar from '../../components/sideBar';
export const Socketio = io.connect("https://sheltered-plains-71715.herokuapp.com", {
    reconnection: true
});

export default function Socket() {



    useEffect(() => {

        Socketio.on("enviarMensaje", function (e) {
            console.log("Servidor: ", e);
        })
    }, [])

    const enviarARacing = () => {
        Socketio.emit("enviarMensajeP", {
            usuario: `Racing Club`,
            userid: "5f93e041d43f940b8ea9ff34",
            mensaje: "Hola"
        })
    }
    const enviarAMartin = () => {
        Socketio.emit("enviarMensajeP", {
            usuario: `Martin carp `,
            userid: "5efc538ea235f8e21cdf4de6",
            mensaje: "Hola"
        })
    }




    return (
        <div onClick={enviarAMartin}>

            <SideBar />
            <div id="page-wrap" onClick={enviarARacing}>
                <h1>Cool Restaurant 🍔🍕</h1>
                <h2>Check out our offerings in the sidebar!</h2>
            </div>
            <Button >
                Enviar a Martin
            </Button>
        </div>
    )
}
