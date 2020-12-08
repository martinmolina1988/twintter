import React, { useEffect, useState } from 'react'
import { deleteNotif } from '../../../api/notif';
import { getRTApi, removeRTApi, rtApi } from '../../../api/rt';
import useAuth from '../../../hooks/useAuth';
import { Retweet } from "../../../utils/Icons"
import ReTweetModal from '../../Modal/ReTweetModal/ReTweetModal';
import "./RT.scss";

export default function RT(props) {
    const userLogged = useAuth();
    const { tweet, setRts } = props;
    const [loadingTweets, setLoadingTweets] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const RT = () => {


        rtApi(tweet._id).then(response => {
            console.log(response)

        }

        )
    }
    const removeRT = () => {

        removeRTApi(tweet._id).then(response => {
            setLoadingTweets(false);
            setRts(true)
        }

        )

        deleteNotif(userLogged?._id, "rt", tweet?._id)
    }

    useEffect(() => {

        getRTApi(tweet._id).then(response => {
            if (response.status) {

                setLoadingTweets(true)
                setRts(false)

            }
        }).catch(err => {
            setLoadingTweets(false);
            setRts(false)
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet])


    const RTModal = () => {
        console.log("showModal");
        setShowModal(true);
        setLoadingTweets(true);
        setRts(true)

    }

    return (
        <>
            <div className="rt">

                {!loadingTweets ?
                    (<Retweet className="rt" onClick={RTModal} />)
                    :
                    (<Retweet className="rt-onn" onClick={removeRT} />)

                }
            </div>
            <ReTweetModal setRts={setRts} tweet={tweet} setShowModal={setShowModal} showModal={showModal} />
        </>
    )

}
