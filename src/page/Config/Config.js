import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import BasicLayout from '../../layout/BasicLayout';

import "./Config.scss";
import PasswordModal from '../../components/passwordModal';
import EmailModal from '../../components/emailModal';
import { API_HOST2 } from '../../utils/constants';

export default function Config(props) {
  const { setRefreshCheckLogin } = props
  const userLogged = useAuth();

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const [array, setArray] = useState(false);
  const [data, setData] = useState(null);



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
