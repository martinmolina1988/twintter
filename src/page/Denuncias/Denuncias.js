import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { getComplaint } from "../../api/denuncias";
import "./Denuncias.scss"
import Tweet from './Tweet';
import { map } from 'lodash';
import useAuth from '../../hooks/useAuth';
export default function Denuncias(props) {
    const { setRefreshCheckLogin } = props;
    const user = useAuth();
    const [tweetsID, setTweetsID] = useState(null)
    useEffect(() => {
        const fetchTweet = async () => {
            getComplaint(1).then(response => {
                setTweetsID(response)
            })
        }
        fetchTweet()
    }, [user])
    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
            {
                map(tweetsID, (tweetID, index) => (
                    <Tweet key={index} tweetID={tweetID} index={index} />
                ))
            }
        </BasicLayout>
    )
}
