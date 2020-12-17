import React, { useState, useEffect } from 'react';
import { API_HOST } from "../../../utils/constants"
import { Button, Spinner } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";

import EditUserForm from "../../user/EditUserForm";
import { checkFollowApi, followUserApi, unFollowUserApi } from "../../../api/follow";
import "./BannerAvatar.scss";
import { Message } from '../../../utils/Icons';
import { userMessage } from "../../../page/Messages/User";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router-dom';
import { checkBlockedApi, BlockedUserApi, unBlockedUserApi } from '../../../api/bloqueos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock, faUserCheck, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';


let num = 0;
function BannerAvatar(props) {

    const { user, loggedUser, history } = props;
    const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}`
        : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNotFound;
    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    useEffect(() => {
        if (user) {

            checkFollowApi(user?.id).then(response => {
                if (response?.status === true) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            });
            setReloadFollow(false);

        }

        num++;
        if (num === 2) {
            num = 0;
        }
    }, [user, reloadFollow])



    const onFollow = () => {

        num = 0;

        followUserApi(user?.id).then(response => {

            setReloadFollow(true);

        })


    }

    const unFollow = () => {

        num = 0;
        unFollowUserApi(user?.id).then(response => {
            setReloadFollow(true)


        })
    }

    const OnClick = () => {
        history.push(`/messages`)
        history.push({
            search: user?.id
        })
    }



    const Block = () => {

        BlockedUserApi(user?.id).then(() => {
            toast.success("El usuario fue bloqueado")
            window.location.reload();
        })
        unFollowUserApi(user?.id)

    }

    return (<>




        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }} >


            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }} />
            {user && (
                <div className="options">
                    {loggedUser._id === user.id &&
                        <Button onClick={() => setShowModal(true)}> Editar perfil</Button>}

                    <div className="d-none d-sm-none d-md-block">
                        {
                            loggedUser._id !== user.id &&
                            following !== null &&
                            (following ? (
                                <div className="botones">
                                    <Message as={Link} to={`/tweet?search=${user?.id}`} className="message" onClick={OnClick} />

                                    <Button onClick={unFollow} className="unfollow"> <span>Siguiendo</span> </Button>
                                    <FontAwesomeIcon className="icon" icon={faLock} onClick={Block} />

                                </div>) : (<div className="botones">
                                    <Button onClick={onFollow}>  "Seguir" </Button>
                                    <FontAwesomeIcon className="icon" icon={faLock} />
                                </div>
                                )

                            )
                        }
                    </div>
                    <div className="d-block d-sm-block d-md-none">
                        {
                            loggedUser._id !== user.id &&
                            following !== null &&
                            (following ? (
                                <div className="botones">
                                    <Message as={Link} to={`/tweet?search=${user?.id}`} className="message" onClick={OnClick} />

                                    <Button onClick={unFollow} className="unfollow"> <span>  <FontAwesomeIcon icon={faUserCheck} /></span> </Button>
                                    <FontAwesomeIcon className="icon" icon={faLock} onClick={Block} />


                                </div>) : (<div className="botones">
                                    <Button onClick={onFollow}>  <FontAwesomeIcon icon={faUserPlus} /> </Button>
                                    <FontAwesomeIcon className="icon" icon={faLock} />
                                </div>
                                )

                            )
                        }
                    </div>
                </div>
            )
            }
            <ConfigModal show={showModal} setShow={setShowModal} title={"Editar perfil"}>
                <EditUserForm
                    user={user}
                    setShowModal={setShowModal}
                />
            </ConfigModal>
        </div >

    </>
    )

}

export default withRouter(BannerAvatar)