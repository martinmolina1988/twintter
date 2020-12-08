import React, { useState, useEffect } from "react";
import "./Tweet.scss";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { getTweetApi } from "../../api/tweet";
import Tw from "./Tw";



function Tweet(props) {
    const [tweetRT, setTweetRT] = useState(null)
    const [tweetSinRT, setTweetSinRT] = useState(null)
    const [tweetSinRT2, setTweetSinRT2] = useState(null)
    const [tweetSinRT3, setTweetSinRT3] = useState(null)
    const { tweet, History, key } = props;
    const [rtid, setRtid] = useState(false)


    useEffect(() => {

        if (tweet?.rtId) {

            getTweetApi(tweet?.rtId).then(response => {
                setTweetRT(response)
                setRtid(true)
                setTweetSinRT2([{ ...setTweetSinRT2 }, response]);
            })
        } else {
            setTweetRT(tweet)
        }




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet, History])




    return (
        <div>

            {    tweetRT !== null && <Tw tweet={tweetRT} />
            }


        </div>
    )
}

export default withRouter(Tweet)

