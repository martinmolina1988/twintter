import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { getTweetApi } from '../../api/tweet';
import { getUserApi } from '../../api/user';
import Tw from '../../components/Tweet/Tw';
import { API_HOST } from '../../utils/constants';
import { Message, RtNotif, LikeNotif } from "../../utils/Icons"
import AvatarNoFound from "../../assets/png/avatar-no-found.png";

export default function Tweet(props) {
    const { not } = props;
    const [tweet, setTweet] = useState(null)
    const [user, setUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        const fetchTweet = async () => {
            await getTweetApi(not.tweetId).then(response => {

                setTweet(response)
            })

        }
        fetchTweet()

    }, [not])

    useEffect(() => {
        const fetchUser = async () => {
            await getUserApi(not.usernotifId).then(response => {

                setUser(response)
                setAvatarUrl(
                    response?.avatar
                        ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                        : AvatarNoFound
                );
            })

        }
        fetchUser()

    }, [not])


    return (
        <div>

            {
                not.tipo === "cita" && tweet && <div>
                    <div className="title">  <RtNotif className="rt" />
                        <Image className="avatar" src={avatarUrl} roundedCircle />
                        <p> {user?.nombre} {user?.apellidos} Te cito </p></div>
                    <Tw tweet={tweet} />
                </div>
            }
            {
                not.tipo === "rt" && tweet && <div>
                    <div className="title">    <RtNotif className="rt" />
                        <Image className="avatar" src={avatarUrl} roundedCircle />
                        <p> {user?.nombre} {user?.apellidos} Te retwitteo </p> </div>
                    <Tw tweet={tweet} />
                </div>
            }
            {
                not.tipo === "respuesta" && tweet && <div>
                    <div className="title"> <Message className="mensajes" />
                        <Image className="avatar" src={avatarUrl} roundedCircle />
                        <p> {user?.nombre} {user?.apellidos} Te respondio </p></div>
                    <Tw tweet={tweet} />
                </div>
            }
            {
                not.tipo === "like" && tweet && <div>
                    <div className="title">       <LikeNotif className="like" />
                        <Image className="avatar" src={avatarUrl} roundedCircle />
                        <p> {user?.nombre} {user?.apellidos} Te dio like </p> </div>
                    <Tw tweet={tweet} />
                </div>
            }



        </div>
    )
}
