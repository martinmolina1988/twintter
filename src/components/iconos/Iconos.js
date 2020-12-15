import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUsers,
    faPowerOff,
    faHome,
    faCog, faBell, faComment
} from "@fortawesome/free-solid-svg-icons";
import { Lupa } from '../../utils/Icons';
import "./Iconos.scss";
import { Link } from 'react-router-dom';

export default function Iconos() {
    return (
        <div className="iconos">
            <Link to="/"  > <FontAwesomeIcon icon={faHome} />  </Link>
            <Lupa className="svg" />
            <Link to="/notifications"  >     <FontAwesomeIcon icon={faBell} /> </Link>
            <Link to="/messages"> <FontAwesomeIcon icon={faComment} />  </Link>
        </div>
    )
}
