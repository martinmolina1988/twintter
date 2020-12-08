import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faUsers,
    faPowerOff,
    faHome,
    faCog, faBell, faComment
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { logoutApi } from '../../api/auth';
import { getUserApi } from '../../api/user';
import TweetModal from '../Modal/TweetModal';
import "./Menu.scss"
export default function Menu(props) {
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
        <div className="menu" >

            <Dropdown className={"d-block d-sm-block d-md-block d-lg-none"}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">

                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item ><Link to="/"  > <FontAwesomeIcon icon={faHome} /> Inicio </Link></Dropdown.Item>
                    <Dropdown.Item > <Link to="/notifications"  > <FontAwesomeIcon icon={faBell} /> Notificaciones </Link></Dropdown.Item>
                    {userLogged?.rango === "admin" &&
                        <Dropdown.Item > <Link to="/denuncias"  > <FontAwesomeIcon icon={faBell} /> Denuncias </Link></Dropdown.Item>
                    }
                    <Dropdown.Item > <Link to="/messages"> <FontAwesomeIcon icon={faComment} /> Mensajes </Link> </Dropdown.Item>
                    <Dropdown.Item >  <Link to={`/${user?._id}`}> <FontAwesomeIcon icon={faUser} /> Perfil </Link></Dropdown.Item>
                    <Dropdown.Item >  <Link to="/users"> <FontAwesomeIcon icon={faUsers} /> Usuarios </Link></Dropdown.Item>
                    <Dropdown.Item >   <Link to="" onClick={logout} > <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión </Link></Dropdown.Item>
                    <Dropdown.Item >  <Link to="/setting"> <FontAwesomeIcon icon={faCog} /> Configuraciones </Link></Dropdown.Item>
                    <Dropdown.Item > <Button onClick={() => setShowModal(true)}>Twittear</Button> </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <TweetModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
