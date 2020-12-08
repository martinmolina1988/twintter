import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import BasicLayout from '../../layout/BasicLayout';
import socketIOClient from "socket.io-client";

import "./Config.scss";
import PasswordModal from '../../components/passwordModal';
import EmailModal from '../../components/emailModal';
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

export default function Config(props) {
  const { setRefreshCheckLogin } = props
  const userLogged = useAuth();

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const [array, setArray] = useState(false);
  const [data, setData] = useState(null);


  useEffect(() => {
    if (userLogged) {
      socket.emit("conectado", {
        userid: userLogged._id
      })
    }
    socket.on("enviarMensaje", function (e) {
      console.log("Servidor: ", e);
      setData(e);
    })
  }, [userLogged])

  const enviarARacing = () => {
    socket.emit("enviarMensajeP", {
      usuario: `Racing Club`,
      userid: "5f93e041d43f940b8ea9ff34",
      mensaje: "Hola"
    })
    setArray(true)
  }
  const enviarAMartin = () => {
    socket.emit("enviarMensajeP", {
      usuario: `Martin carp `,
      userid: "5efc538ea235f8e21cdf4de6",
      mensaje: "Hola"
    })
    setArray(true)
  }


  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} >
      <div className="config"><h2>Configuraciones </h2>

        <div className="opciones">
          <h5 onClick={() => setShow(true)} > Cambiar tu direccion de email
        </h5>
          <h5 onClick={() => setShowModal(true)}>Cambiar tu contraseña
        </h5>

        </div>
      </div>

      <EmailModal show={show} setShow={setShow} />
      <PasswordModal show={showModal} setShow={setShowModal} />
    </BasicLayout>

  )
}
