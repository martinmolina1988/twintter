import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { getUserApi } from '../../../api/user';
import { API_HOST } from '../../../utils/constants';
import avatarNotFound from "../../../assets/png/avatar-no-found.png";
import ButtonFollow from '../../ButtonFollow/ButtonFollow';

export default function User(props) {
    const { likes } = props;

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserApi(likes.userlikeid).then(response => {
            setUser(response);
        })

    }, [likes])

    return (
        <div className="user">
            <Image className="mr-3 avatar"
                roundedCircle
                width={64}
                height={64}
                alt={`${user?.nombre} ${user?.apellidos}`}

                src={
                    user?.avatar ?
                        `${API_HOST}/obtenerAvatar?id=${user.id}`
                        :
                        avatarNotFound
                } />
            <div className="div">
                <h2>
                    {user?.nombre} {user?.apellidos}
                </h2>
                <p>  {user?.email}</p>
                <p>{user?.biografia}</p>
            </div>
            <ButtonFollow user={user} />
        </div>
    )
}
