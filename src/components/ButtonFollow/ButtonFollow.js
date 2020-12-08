import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { checkFollowApi, followUserApi, unFollowUserApi } from '../../api/follow';
import useAuth from '../../hooks/useAuth';
import "./ButtonFollow.scss";


let num = 0;
export default function ButtonFollow(props) {

    const { user } = props;
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);
    const loggedUser = useAuth();

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
    return (
        <div className="button-follow">
            {loggedUser?._id !== user?.id &&
                following !== null &&
                (following ? (

                    <Button onClick={unFollow} className="unfollow">  <span>Siguiendo</span> </Button>
                ) : (
                        <Button onClick={onFollow}> <span> Seguir </span> </Button>

                    )

                )
            }
        </div>
    )
}
