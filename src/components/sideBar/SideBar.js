import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faUsers,
    faPowerOff,
    faHome,
    faCog, faBell, faComment
} from "@fortawesome/free-solid-svg-icons";
import { slide as Menu } from "react-burger-menu";
import "./SideBar.scss";
import useAuth from "../../hooks/useAuth";
import { logoutApi } from "../../api/auth";
import { getUserApi } from "../../api/user";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import TweetModal from "../Modal/TweetModal";
export default function SideBar(props) {
    const { setRefreshCheckLogin } = props;
    const user = useAuth();
    const [userLogged, setUserLogged] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }

    useEffect(() => {

        getUserApi(user._id).then(response => {

            setUserLogged(response)
        })
    }, [user])
    return (
        // Pass on our props
        <Menu {...props}>
            <Link to="/"  > <FontAwesomeIcon icon={faHome} /> Inicio </Link>
            <Link to="/notifications"  > <FontAwesomeIcon icon={faBell} /> Notificaciones </Link>
            {userLogged?.rango === "admin" &&
                <Link to="/denuncias"  > <FontAwesomeIcon icon={faBell} /> Denuncias </Link>
            }
            <Link to="/messages"> <FontAwesomeIcon icon={faComment} /> Mensajes </Link>
            <Link to={`/${user?._id}`}> <FontAwesomeIcon icon={faUser} /> Perfil </Link>
            <Link to="/users"> <FontAwesomeIcon icon={faUsers} /> Usuarios </Link>
            <Link to="" onClick={logout} > <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión </Link>
            <Link to="/setting"> <FontAwesomeIcon icon={faCog} /> Configuraciones </Link>
            <Button onClick={() => setShowModal(true)}>Twittear</Button>
            <TweetModal show={showModal} setShow={setShowModal} />
        </Menu>
    );
};
