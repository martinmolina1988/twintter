import React, { useEffect, useState } from 'react'
import { getUserNotifApi } from '../../api/notif';
import useAuth from '../../hooks/useAuth';
import BasicLayout from '../../layout/BasicLayout'
import { map } from "lodash";

import "./Prueba.scss"
import Tweet from './Tweet';

export default function Prueba(props) {
    const { setRefreshCheckLogin } = props
    const userLogged = useAuth();
    const [notif, setNotif] = useState(null)
    const [tweet, setTweet] = useState(null)

    useEffect(() => {
        getUserNotifApi(userLogged._id, 1).then(response => {
            setNotif(response)



        })

    }, [userLogged])





    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>

            <div className="notif">
                {
                    map(notif, (not, index) => (
                        <Tweet key={index} not={not} index={index} />
                    ))
                }
            </div>
        </BasicLayout>
    )
}
