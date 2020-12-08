import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { getTweetApi } from '../../api/tweet';
import queryString from "query-string";
import Tweet from "./Tweet"
import { getResponseApi } from '../../api/rta';
import BasicLayout from "../../layout/BasicLayout"
import ListTweets from '../../components/ListTweet/ListTweets';




function TweetPage(props) {

    const { location, setRefreshCheckLogin } = props;
    const { search } = location;
    const params = useUserQuery(location);
    const [tweet, setTweet] = useState(null)
    const [tweets, setTweets] = useState(null)
    const [likes, setLikes] = useState(false)
    const [rts, setRts] = useState(false)
    function useUserQuery(location) {
        const search = queryString.parse(location.search);
        return { search };
    }

    useEffect(() => {
        getTweetApi(params.search.search).then(response => {

            setTweet(response)
            setLikes(false)
            setRts(false)
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes, rts, params.search.search])

    useEffect(() => {
        getResponseApi(tweet?._id, 1).then(response => {
            setTweets(response)

        })
    }, [tweet, search])


    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="titulo">  <h3  >Tweet</h3></div>
            {tweet && (
                <>
                    <Tweet setRefreshCheckLogin={setRefreshCheckLogin} likes={likes} rts={rts} setRts={setRts} setLikes={setLikes} tweet={tweet} />
                    <ListTweets tweets={tweets} />

                </>)}


        </BasicLayout>
    )
}
export default withRouter(TweetPage)