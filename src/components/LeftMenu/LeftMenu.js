import React, { useEffect, useState } from 'react';

import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/png/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUsers,
    faPowerOff,
    faHome,
    faCog, faBell, faComment
} from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import TweetModal from "../Modal/TweetModal";
import { getUserApi } from '../../api/user';
import Menu from '../Menu';
import { reseteoNotif } from '../../api/notif';
import { Campana, Denuncia } from "../../utils/Icons";
import { getCountComplaint } from '../../api/denuncias';
import "./LeftMenu.scss";
import { Socketio } from '../../page/socket/Socket';
import SideBar from '../sideBar';



export default function LeftMenu(props) {

    const [data, setData] = useState(null);
    const { setRefreshCheckLogin } = props;
    const user = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [notif, setNotif] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    Socketio.emit("conectado", {
        userid: user._id
    });

    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }

    const resetNotif = () => {
        reseteoNotif(user?._id)
    }

    useEffect(() => {
        if (user) {
        }
        Socketio.on("enviarMensaje", function (e) {
            console.log("Servidor: ", e);
        })

        Socketio.on("notif", function (e) {
            console.log("Servidor: ", e);
            setNotif(e.estado)
        })
    }, [user])
    useEffect(() => {
        setNotif(false)

        getUserApi(user._id).then(response => {

            setUserLogged(response)
        })

        getCountComplaint().then(response => {
            setData(response)
        })

    }, [user, notif])


    return (<>
        <div className="d-none d-sm-none d-md-block">
            <div className="left-menu " >
                <img className="logo" src={LogoWhite} alt="Twittor" />
                <Link to="/"  > <FontAwesomeIcon icon={faHome} /> Inicio </Link>

                {userLogged?.notif > 0 ? (

                    <div className="notif">
                        <Link to="/notifications" onClick={resetNotif} >   <Campana
                            className="iconNotif" />   Notificaciones </Link> </div>
                ) : (
                        <Link to="/notifications"  >   <Campana className="icon" />  Notificaciones </Link>
                    )}



                {userLogged?.rango === "admin" &&
                    <Link to="/denuncias"  >

                        <Denuncia className="icon" />{data?.count > 0 && <span> {data?.count} </span>} Denuncias </Link>
                }

                <Link to="/messages"> <FontAwesomeIcon icon={faComment} /> Mensajes </Link>
                <Link to={`/${user?._id}`}> <FontAwesomeIcon icon={faUser} /> Perfil </Link>
                <Link to="/users"> <FontAwesomeIcon icon={faUsers} /> Usuarios </Link>
                <Link to="" onClick={logout} > <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión </Link>
                <Link to="/setting"> <FontAwesomeIcon icon={faCog} /> Configuraciones </Link>

                <Button onClick={() => setShowModal(true)}>Twittear</Button>
                <TweetModal show={showModal} setShow={setShowModal} />
            </div>
        </div>

        <div className="d-block d-sm-block d-md-none d-lg-none">
            <SideBar setRefreshCheckLogin={setRefreshCheckLogin} />
        </div>
    </>)


}
