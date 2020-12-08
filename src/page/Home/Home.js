import React, { useEffect, useState } from 'react'
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import { getTweetsFollowersApi } from "../../api/tweet";
import ListTweets from "../../components/ListTweet"
import "./Home.scss";

export default function Home(props) {
    const { setRefreshCheckLogin } = props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);

    const moreData = () => {
        setLoadingTweets(true);
        setPage(page + 1);
    }
    useEffect(() => {
        const fetchTweet = async () => {
            await getTweetsFollowersApi(page)
                .then((response) => {

                    if (!tweets && response) {
                        setTweets(formatModel(response));
                    } else {
                        if (!response) {
                            setLoadingTweets(0);
                        } else {
                            const data = formatModel(response);
                            setTweets([...tweets, ...data]);
                            setLoadingTweets(false);
                            console.log(tweets)
                        }
                    }
                }
                )
                .catch(() => { });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        fetchTweet()
    }, [page]);

    return (

        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets tweets={tweets} />}
            <Button onClick={moreData} className="load-more">
                {!loadingTweets ? (
                    loadingTweets !== 0 ? (
                        "Obtener más Tweets"
                    ) : (
                            "No hay más tweets"
                        )
                ) : (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const tweetsTemp = [];
    tweets.forEach(tweet => {
        tweetsTemp.push({
            _id: tweet?.Tweet?._id,
            userId: tweet?.userRelationId,
            mensaje: tweet?.Tweet.mensaje,
            fecha: tweet?.Tweet?.fecha,
            like: tweet?.Tweet?.like,

            userrtaId: tweet?.Tweet?.userrtaId,
            rtaId: tweet?.Tweet?.rtaId,
            rtIdmsj: tweet?.Tweet?.rtIdmsj,
            rtId: tweet?.Tweet?.rtId,
            respuestas: tweet?.Tweet?.respuestas

        })

    })
    return tweetsTemp;
}