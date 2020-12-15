import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import Chat from '../../page/Messages/Chat';
import { sendMessage, sendUserMessage } from '../../api/mensajes';
import socketIOClient from "socket.io-client";
import "./ChatLayout.scss"
import useAuth from '../../hooks/useAuth';
import { API_HOST2 } from '../../utils/constants';
import { Socketio } from '../../page/socket/Socket';

function Right(props) {
    const { us, userss, location } = props;
    const [loadMsj, setLoadMsj] = useState(false)
    const [userData, setUserData] = useState(null)
    const ENDPOINT = API_HOST2;
    const userLogged = useAuth();

    const [loadSend, setLoadSend] = useState(false)
    const [value, setValue] = useState("")

    const enter = (e) => {
        const mensaje = value;

        if (e.key === 'Enter') {
            if (mensaje !== "") {

                Socketio.emit("chat", {

                    userid: location.search.substring(1),
                    estado: true
                })

                sendMessage(location.search.substring(1), mensaje)
                sendUserMessage(location.search.substring(1))
                setValue("");
                setLoadSend(true)
            }
        }

    }
    return (
        <div>{userData &&
            <h2>{userData?.nombre} {userData?.apellidos} </h2>
        }


            <Chat us={us} userss={userss}
                setLoadMsj={setLoadMsj}
                loadSend={loadSend}
                setLoadSend={setLoadSend}
                setUserData={setUserData} />

            {loadMsj && userData &&

                <input
                    className="fixed-b"
                    type="text"
                    placeholder={` Escribe un mensaje..`}
                    value={value}
                    onChange={event => {
                        setValue(event.target.value);
                    }}
                    onKeyPress={enter}

                />
            }

        </div>
    )
} export default withRouter(Right)
