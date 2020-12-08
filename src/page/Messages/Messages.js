import React, { useEffect, useState } from 'react'
import { getUserMessage } from '../../api/mensajes';
import User from './User';
import useAuth from '../../hooks/useAuth';
import "./Messages.scss";
import { map } from 'lodash';
import ChatLayout from '../../layout/ChatLayout';
export default function Messages(props) {

    const { setRefreshCheckLogin } = props
    const userLogged = useAuth();

    const [us, setUs] = useState(null)

    const [userss, setUserss] = useState(null)
    const [users, setUsers] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {
            await getUserMessage(userLogged._id, 1).then(response => {
                setUsers(response)
            })
        }
        fetchUser()
    }, [userLogged, userss])

    return (

        <ChatLayout setRefreshCheckLogin={setRefreshCheckLogin} us={us} userss={userss}  >
            <h2 className="h2 d-none d-sm-none d-md-none d-lg-block">Mensajes</h2>
            <ul className="list">

                {map(users, (user, index) =>
                (
                    <User userLogged={userLogged} key={user.userrecived} user={user} index={index} setUs={setUs} setUserss={setUserss} />
                ))}
            </ul>
        </ChatLayout>
    )
}
