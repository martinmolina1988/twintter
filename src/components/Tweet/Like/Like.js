import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { altaNotif, aumentoNotif, deleteNotif } from '../../../api/notif';
import { likeApi, getLikeApi, removeLikeApi } from "../../../api/tweet";
import useAuth from '../../../hooks/useAuth';
import { Heart } from "../../../utils/Icons"
import socketIOClient from "socket.io-client";
import "./Like.scss";

export default function Like(props) {
    const ENDPOINT = "http://localhost:3001";
    const socket = socketIOClient(ENDPOINT);
    const userLogged = useAuth();
    const { tweet, setLikes, likes } = props;
    const { like } = tweet;
    const [loadingTweets, setLoadingTweets] = useState(false)



    const Like = () => {
        socket.emit("notif", {

            userid: tweet?.userId,
            estado: true
        })

        if (userLogged._id !== tweet?.userId) {
            aumentoNotif(tweet?.userId).then(response => {
                console.log(response)
            })

        }
        likeApi(tweet._id).then(response => {
            setLoadingTweets(true);
            setLikes(true)

        })
        if (userLogged._id !== tweet?.userId) {
            altaNotif("like", tweet?._id, tweet?.userId)
                .then((response) => {
                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success(response.message);

                    }
                })
        }
    }

    const removeLike = () => {

        removeLikeApi(tweet._id).then(response => {
            setLoadingTweets(false);
            setLikes(true)
        })
        deleteNotif(userLogged?._id, "like", tweet?._id)
    }

    useEffect(() => {

        getLikeApi(tweet._id).then(response => {

            if (response.status) {

                setLoadingTweets(true)
                setLikes(false)

            }
        }).catch(err => {
            setLoadingTweets(false);
            setLikes(false)
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet])




    return (
        <>
            <div className="like">

                {!loadingTweets ?
                    (<Heart className="heart" onClick={Like} />)
                    :
                    (<Heart className="heartlike" onClick={removeLike} />)

                }
            </div>

        </>
    )

}
