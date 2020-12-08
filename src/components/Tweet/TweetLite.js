
import React, { useState, useEffect } from "react";
import { Image, Media } from "react-bootstrap";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { getUserApi } from "../../api/user";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./Tweet.scss";
import UserPop from "../Modal/UserPop";
import { Link } from "react-router-dom";
import { getTweetApi } from "../../api/tweet";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function TweetLite(props) {
    const [target, setTarget] = useState(null)
    const [show, setShow] = useState(false);
    const { tweet, rtIdmsj, location, setRefreshCheckLogin } = props;
    const [tweets, setTweets] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loadingTweets, setLoadingTweets] = useState(null)
    useEffect(() => {
        if (rtIdmsj) {

            getTweetApi(rtIdmsj).then((response) => {
                setTweets(response)
            });

        }
        if (tweet) {

            getTweetApi(tweet?._id).then((response) => {
                setTweets(response)
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet, rtIdmsj]);



    useEffect(() => {
        if (tweets) {


            getUserApi(tweets.userId).then((response) => {
                setUserInfo(response);
                setAvatarUrl(
                    response?.avatar
                        ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                        : AvatarNoFound
                );
            });

        }
    }, [tweets, rtIdmsj])

    return (
        <div className="tweet">
            <div className="contenedor" >
                <Image className="avatar-lite" src={avatarUrl} roundedCircle />
                <div>
                    <div className="name">
                        <Link to={`/${userInfo?.id}`}
                            onMouseEnter={(e) => { setShow(true); setTarget(e.target); }}
                            onMouseLeave={() => { setShow(false); }}
                        >  {userInfo?.nombre} {userInfo?.apellidos}</Link>

                        <span>{moment(tweets?.fecha).calendar()}</span>
                    </div>
                    <Media as={Link} to={`/tweet?search=${rtIdmsj}`} className="media" >
                        <Media.Body>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: replaceURLWithHTMLLinks(tweets?.mensaje),
                                }}
                            />
                        </Media.Body></Media>
                </div>

                <UserPop
                    show={show}
                    setShow={setShow}
                    nombre={userInfo?.nombre}
                    target={target}
                    avatarUrl={avatarUrl}
                    userInfo={userInfo}
                />
            </div>        </div>
    )
}

export default withRouter(TweetLite)
