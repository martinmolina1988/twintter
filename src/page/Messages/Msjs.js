import React, { useState, useRef } from 'react';
import moment from "moment"; import useAuth from '../../hooks/useAuth';
import { API_HOST } from '../../utils/constants';
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "../h2/chat.scss"

function Msjs(props) {
    const divRef = useRef(null);
    const userLogged = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const { msj, userss, location } = props;

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
    useEffect(() => {

        setAvatarUrl(
            msj?.usersend
                ? `${API_HOST}/obtenerAvatar?id=${msj?.usersend}`
                : AvatarNoFound
        );

    }, [msj, userss, location])
    return (
        <div className="chat" ref={divRef}>
            {

                userLogged._id !== msj.usersend &&
                <div className="cn">
                    <div className="cont">
                        <Image className="avatar" src={avatarUrl} roundedCircle />
                        <p>{msj.mensaje} </p>
                    </div>
                    <span className="fecha">{moment(msj.fecha).fromNow()}</span>

                </div>
            }
            { userLogged._id === msj.usersend &&
                <div className="right d-flex flex-row-reverse">
                    <div className="msj">
                        <p> {msj.mensaje} </p>
                        <span className="fecha">{moment(msj.fecha).fromNow()}</span>
                    </div>
                </div>

            }
        </div>

    )
}
export default withRouter(Msjs)