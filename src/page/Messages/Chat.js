import { map } from 'lodash';
import React from 'react'
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getMessage, sendMessage, sendUserMessage } from '../../api/mensajes';
import { getUserApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import H2 from '../h2/H2';
import Msjs from './Msjs';
import "../h2/chat.scss"
import socketIOClient from "socket.io-client";
import { API_HOST2 } from '../../utils/constants';
import { Socketio } from '../socket/Socket';

function Chat(props) {
    const ENDPOINT = API_HOST2;
    const socket = socketIOClient(ENDPOINT);
    const { location, setLoadMsj, setLoadSend, loadSend } = props;

    const [usersSend, setUsersSend] = useState(null)
    const [socketChat, setSocketChat] = useState(false)



    const userLogged = useAuth();
    const { us, userss, setUserData } = props;
    useEffect(() => {

        Socketio.emit("conectado", {
            userid: userLogged._id
        })

        Socketio.on("enviarMensaje", function (e) {
            console.log("Servidor: ", e);
        })

        Socketio.on("chat", function (e) {
            setSocketChat(e.estado)
        })


    }, [userLogged])
    useEffect(() => {

        setSocketChat(false)
        const fetch = async () => {

            await getMessage(1, userLogged._id, location.search.substring(1)).then(response => {
                setUsersSend(response)
                setLoadSend(false)
                setLoadMsj(true)
            })

        }
        fetch()
    }, [userss, socketChat, us, loadSend, location.search.substring(1)])

    useEffect(() => {
        const fetchUser = async () => {
            await getUserApi(location.search.substring(1)).then(response => {

                setUserData(response)


            })
        }
        fetchUser();

    }, [us])




    return (
        <div className="chatgeneral">
            { usersSend !== null &&

                <ul className="list">

                    {map(usersSend, (msj, index) =>
                    (
                        <Msjs className="msjs" key={index} msj={msj} userss={userss} />
                    ))}
                </ul>
            }

        </div>
    )
}
export default withRouter(Chat)
