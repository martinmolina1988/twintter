import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Media } from 'react-bootstrap';
import { API_HOST } from '../../utils/constants';
import avatarNotFound from "../../assets/png/avatar-no-found.png";
import { getUserApi } from '../../api/user';
import ButtonFollow from '../ButtonFollow/ButtonFollow';

export default function user(props) {
    const { user } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfo, setUserInfo] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getUserApi(user.id).then(response => {
            setUserInfo(response)
        })
    }, [user])
    return (


        <Media as={Link} to={`/${user.id}`} className="list-users__user" key={user.id}>

            <Image className="mr-3 avatar"
                roundedCircle
                width={64}
                height={64}
                alt={`${user.nombre} ${user.apellidos}`}

                src={
                    userInfo?.avatar ?
                        `${API_HOST}/obtenerAvatar?id=${user.id}`
                        :
                        avatarNotFound
                }
            />



            <Media.Body>

                <h5> {user.nombre} {user.apellidos}</h5>
                <p> @{user.id}</p>
                <p> {userInfo?.biografia}</p>

            </Media.Body>
            <ButtonFollow user={userInfo} />
        </Media>


    )
}
