import React, { useState } from 'react'
import { getTweetApi } from '../../api/tweet';
import Tw from '../../components/Tweet/Tw';
import "./Denuncias.scss"
export default function Tweet(props) {
    const { tweetID } = props;
    const [tweet, setTweet] = useState(null)

    getTweetApi(tweetID?._id).then(response => {

        setTweet(response)
    })
    return (
        <div className="denuncias">
            { tweet &&
                <Tw className="tw" tweet={tweet} >
                    <p>Este tweet contiene {tweetID?.count} denuncias</p>

                </Tw>
            }
        </div>
    )
}
