import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Media } from "react-bootstrap";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { getUserApi } from "../../api/user";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import UserPop from "../Modal/UserPop";
import UserPopTweet from "../Modal/UserPopTweet";
import { Link } from "react-router-dom";
import Like from "./Like"
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { deleteTweet, getTweetApi } from "../../api/tweet";
import RT from "./RT";
import TweetLite from "./TweetLite"
import RTA from "./RTA";
import { getResponseApi, getResponseCountApi } from "../../api/rta";
import ListTweets from "../ListTweet";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { altaComplaint } from "../../api/denuncias";
import { Close } from "../../utils/Icons";
import { checkBlockedApi, unBlockedUserApi } from "../../api/bloqueos";
import "./Tweet.scss";

function Tw(props) {

    const { tweet, location, children } = props;
    const { search } = location;
    const userLogged = useAuth();
    const [target, setTarget] = useState(null)
    const [show, setShow] = useState(false);
    const [showM, setShowM] = useState(false);
    const [showP, setShowP] = useState(false);
    const [tweets, setTweets] = useState(null)

    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarUrlRTA, setAvatarUrlRTA] = useState(null);
    const [userRTA, setUserRTA] = useState(null)
    const [likes, setLikes] = useState(false)
    const [rts, setRts] = useState(false)
    const [countLike, setCountLike] = useState(null)
    const [countRT, setCountRT] = useState(null)
    const [countRTA, setCountRTA] = useState(null)
    const [onnClick, setOnnClick] = useState(false)
    const [userRange, setUserRange] = useState(null)

    const [iAmBlock, setIAmBlock] = useState(false);
    const [isBlock, setIsBlock] = useState(false);
    const [loadBlock, setLoadBlock] = useState(false);

    useEffect(() => {
        getResponseCountApi(tweet?._id).then(response => {
            setCountRTA(response?.count)

        })
    }, [countRTA, tweet, search])

    useEffect(() => {
        getUserApi(tweet?.userId).then((response) => {
            setUserInfo(response);
            setAvatarUrl(
                response?.avatar
                    ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                    : AvatarNoFound
            );
        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet, search]);

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
        usersRTA();
    }, [tweet, search])

    useEffect(() => {
        getTweetApi(tweet._id).then(response => {

            setCountLike(response?.like?.length)
            setCountRT(response?.retweet?.length)
            setLikes(false)
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadBlock])


    const onClick = () => {

        getResponseApi(tweet?._id, 1).then(response => {
            setTweets(response)
        })
        setOnnClick(true)

    }
    const Denuncia = () => {
        altaComplaint(tweet?._id, tweet?.userId).then(response => {
            toast.success("La denuncia fue enviada");
        })
    }
    const Delete = () => {
        deleteTweet(tweet?._id).then(response => {
            toast.success("El tweet fue eliminado");
        })
    }


    useEffect(() => {

        getUserApi(userLogged._id).then(response => {

            setUserRange(response)
        })
    }, [tweet])



    useEffect(() => {
        if (tweet) {
            const fetchTweets = async () => {
                await checkBlockedApi(tweet?.userId, userLogged._id).then(response => {
                    if (response?.status) {
                        setIAmBlock(true);
                    } else {
                        setIAmBlock(false);
                    }
                    setLoadBlock(true)
                });
            }
            fetchTweets()
        }
    }, [tweet])

    useEffect(() => {
        if (tweet) {

            const fetchTweet = async () => {
                await checkBlockedApi(userLogged._id, tweet?.userId).then(response => {

                    if (response?.status) {
                        setIsBlock(true);
                    } else {
                        setIsBlock(false);
                    }
                    setLoadBlock(true)
                });
            }
            fetchTweet()
        }
    }, [tweet]);



    const unBlock = () => {

        unBlockedUserApi(userInfo?.id).then(() => {
            toast.success("El usuario fue desbloqueado");
            window.location.reload();
        })
    }

    return (
        <>
            {
                iAmBlock ? (
                    <p> No tenés permisos para ver esta publicacion!</p >
                ) :
                    (

                        isBlock ? (
                            <div className="lock">
                                <p>Bloqueaste a  {userInfo?.nombre} {userInfo?.apellidos} desbloquealo/a para poder ver su tweet </p>
                                <Button onClick={unBlock} className="blocked" > Desbloquear</Button>

                            </div>) : (
                                <>
                                    <div className="tw">
                                        {
                                            userRange?.rango === "admin" ? (
                                                <Close className="close" onClick={Delete} />
                                            ) : (


                                                    <DropdownButton as={ButtonGroup} title="" id="bg-vertical-dropdown-1" className="denuncia float-right">
                                                        {userLogged._id === tweet?.userId ? (
                                                            <Dropdown.Item eventKey="1" onClick={Delete}>Eliminar</Dropdown.Item>
                                                        ) : (
                                                                <Dropdown.Item eventKey="1" onClick={Denuncia}>Denunciar</Dropdown.Item>


                                                            )}
                                                    </DropdownButton>
                                                )

                                        }
                                        {children}
                                        {tweet?.rtaId &&
                                            <p > En respuesta a  <Link className="name" to={`/${userRTA?.id}`}
                                                onMouseEnter={(e) => { setShowP(true); setTarget(e.target); }}
                                                onMouseLeave={() => { setShowP(false); }}
                                            >  {userRTA?.nombre} {userRTA?.apellidos}</Link>  <Link className="rta" to={`/tweet?search=${tweet?.rtaId}`}
                                                onMouseEnter={(e) => { setShowM(true); setTarget(e.target); }}
                                                onMouseLeave={() => { setShowM(false); }}
                                            >Ir al tweet</Link></p>
                                        }
                                        <div className="tweet" >
                                            <div  >


                                                <div className="name">
                                                    <Image className="avatar" src={avatarUrl} roundedCircle />
                                                    <Link to={`/${userInfo?.id}`}
                                                        onMouseEnter={(e) => { setShow(true); setTarget(e.target); }}
                                                        onMouseLeave={() => { setShow(false); }}
                                                    >  {userInfo?.nombre} {userInfo?.apellidos}</Link>

                                                    <span>{moment(tweet?.fecha).calendar()}</span>

                                                </div>

                                                <Media as={Link} to={`/tweet?search=${tweet?._id}`} className="media" >
                                                    <Media.Body>
                                                        <div className="mensaje"
                                                            dangerouslySetInnerHTML={{
                                                                __html: replaceURLWithHTMLLinks(tweet?.mensaje),
                                                            }}
                                                        />
                                                    </Media.Body>
                                                </Media>
                                                {tweet?.rtIdmsj &&
                                                    <TweetLite rtIdmsj={tweet?.rtIdmsj} />
                                                }                </div>

                                            <UserPop
                                                show={show}
                                                setShow={setShow}
                                                nombre={userInfo?.nombre}
                                                target={target}
                                                avatarUrl={avatarUrl}
                                                userInfo={userInfo}
                                            />


                                            <UserPop
                                                show={showP}
                                                setShow={setShowP}
                                                nombre={userRTA?.nombre}
                                                target={target}
                                                avatarUrl={avatarUrlRTA}
                                                userInfo={userRTA}
                                            />
                                        </div >
                                        <div className="icons">
                                            <div className="containerl">   <RTA className="rt" tweet={tweet} />
                                                {countRTA > 0 &&
                                                    <span className="count">{countRTA}</span>
                                                }
                                            </div>
                                            <div className="containerl">
                                                <RT onClick={() => { setRts(true) }} rts={rts} setRts={setRts} tweet={tweet} />
                                                {countRT > 0 &&
                                                    <span className="count">{countRT}</span>
                                                }
                                            </div>
                                            <div className="containerl">
                                                <Like className="like" onClick={() => setLikes(true)} likes={likes} setLikes={setLikes} tweet={tweet} />

                                                {countLike > 0 &&
                                                    <span className="count">{countLike}</span>
                                                }
                                            </div>
                                        </div>
                                        {countRTA > 0 && onnClick === false &&
                                            <span className="resp" onClick={onClick}

                                            >ver {countRTA} respuestas</span>
                                        }
                                        {
                                            onnClick &&
                                            <div className="list" >
                                                <ListTweets tweets={tweets} />
                                            </div>
                                        }
                                    </div>

                                    <UserPopTweet
                                        show={showM}
                                        setShow={setShowM}

                                        target={target}
                                        tweet={tweet?.rtaId}
                                    />
                                </>

                            ))

            }
        </>
    )
}

export default withRouter(Tw)

