import React, { useState, useEffect } from "react";
import { Button, Image, Media } from "react-bootstrap";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { getUserApi } from "../../api/user";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import UserPop from "../../components/Modal/UserPop";
import { Link } from "react-router-dom";
import TweetLite from "../../components/Tweet/TweetLite"
import Like from "../../components/Tweet/Like"
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import UserLikeModal from "../../components/Modal/UserLikerModal/UserLikeModal";
import "./TweetPage.scss";
import ButtonFollow from "../../components/ButtonFollow/ButtonFollow";
import RT from "../../components/Tweet/RT";
import UserRTModal from "../../components/Modal/UserRTModal";
import UserRTQuoteModal from "../../components/Modal/UserRTQuoteModal";
import { leoRTs } from "../../api/rt";
import RTA from "../../components/Tweet/RTA";
import Tw from "../../components/Tweet";
import { getTweetApi } from "../../api/tweet";

function Tweet(props) {

    const { tweet, likes, setLikes, setRts, setRefreshCheckLogin, location } = props;
    const { search } = location;
    const { like } = tweet;
    const { retweet } = tweet;
    const [target, setTarget] = useState(null)
    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [tweets, setTweets] = useState(null)
    const [avatarUrlRTA, setAvatarUrlRTA] = useState(null);
    const [userRTA, setUserRTA] = useState(null)
    const [showRTQuoteModal, setShowRTQuoteModal] = useState(false);
    const [showRTModal, setShowRTModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tweetRTA, setTweetRTA] = useState(null)

    useEffect(() => {
        getUserApi(tweet.userId).then((response) => {
            setUserInfo(response);
            setAvatarUrl(
                response?.avatar
                    ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                    : AvatarNoFound
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes, tweet]);
    useEffect(() => {
        leoRTs(tweet._id, 1).then(response => {
            setTweets(response)
        })

    }, [showRTQuoteModal])

    const usersRTA = async () => {

        if (tweet?.userrtaId) {
            await getUserApi(tweet?.userrtaId).then((response) => {
                setUserRTA(response);
                setAvatarUrlRTA(
                    response?.avatar
                        ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                        : AvatarNoFound
                );

            });
        }
    }

    useEffect(() => {
        if (!tweet?.rtaId) {
            setTweetRTA(null)

        }

        if (tweet?.rtaId) {

            getTweetApi(tweet?.rtaId).then(response => {
                setTweetRTA(response)

            })
        }
        usersRTA();
    }, [tweet])


    return (

        <>
            {
                tweetRTA !== null &&
                <Tw tweet={tweetRTA} />
            }

            <div className="Tweet" >


                <Image className="avatar" src={avatarUrl} roundedCircle />
                <div className="container">


                    <div className="name">
                        <Link to={`/${userInfo?.id}`}
                            onMouseEnter={(e) => { setShow(true); setTarget(e.target); }}
                            onMouseLeave={() => { setShow(false); }}
                        >  {userInfo?.nombre} {userInfo?.apellidos}
                        </Link>
                    </div>
                    {userInfo?.email}
                    {tweet?.rtaId &&
                        <p > En respuesta a  <Link className="name" to={`/${userRTA?.id}`}
                            onMouseEnter={(e) => { setShowP(true); setTarget(e.target); }}
                            onMouseLeave={() => { setShowP(false); }}
                        >  {userRTA?.nombre} {userRTA?.apellidos}</Link>  <Link className="rta" to={`/tweet?search=${tweet?.rtaId}`}>Ir al tweet</Link></p>
                    }
                </div>

                <ButtonFollow user={userInfo} />
            </div>
            <div className="cabecera">
                <div className="mensaje"
                    dangerouslySetInnerHTML={{
                        __html: replaceURLWithHTMLLinks(tweet.mensaje),
                    }}
                />
                {tweet?.rtIdmsj &&

                    <TweetLite setRefreshCheckLogin={setRefreshCheckLogin} rtIdmsj={tweet.rtIdmsj} />
                }
                <div className="div">

                    <span className="fecha">{moment(tweet.fecha).calendar()}</span>

                </div>
                {tweet?.like?.length > 0 &&
                    <Button onClick={() => setShowModal(true)} className=" link" ><span className="count"> {tweet?.like?.length} </span>Me gusta</Button>
                }
                {tweet?.retweet?.length > 0 &&
                    <Button onClick={() => setShowRTModal(true)} className=" link" ><span className="count"> {tweet?.retweet?.length} </span>Retweet</Button>
                }
                {tweets?.length > 0 &&
                    <Button onClick={() => setShowRTQuoteModal(true)} className=" link" ><span className="count"> {tweets?.length} </span>Retweet citados</Button>
                }

                <div className="icons">

                    <div className="container">   <RTA className="rt" tweet={tweet} /></div>
                    <div className="container">   <RT className="rt" setRts={setRts} tweet={tweet} /></div>

                    <div className="container">   <Like onClick={() => setLikes(true)} setLikes={setLikes} tweet={tweet} className="heart" /></div>

                </div>


                <UserPop
                    show={showP}
                    setShow={setShowP}
                    nombre={userRTA?.nombre}
                    placement="bottom"
                    target={target}
                    avatarUrl={avatarUrlRTA}
                    userInfo={userRTA}
                />

                <UserPop
                    show={show}
                    setShow={setShow}
                    nombre={userInfo?.nombre}
                    target={target}
                    avatarUrl={avatarUrl}
                    userInfo={userInfo}
                />
                <UserLikeModal showModal={showModal} setShowModal={setShowModal} like={like} />
                <UserRTModal showRTModal={showRTModal} setShowRTModal={setShowRTModal} retweet={retweet} />
                <UserRTQuoteModal showRTQuoteModal={showRTQuoteModal} setShowRTQuoteModal={setShowRTQuoteModal} tweets={tweets} />
            </div>
        </>
    )
}
export default withRouter(Tweet)

