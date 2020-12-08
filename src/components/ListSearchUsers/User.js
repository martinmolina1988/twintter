import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Media, Dropdown } from 'react-bootstrap';
import { API_HOST } from '../../utils/constants';
import avatarNotFound from "../../assets/png/avatar-no-found.png";
import { getUserApi } from '../../api/user';

import "./ListSearchUsers.scss"
export default function user(props) {
    const { user, index, searchName } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfo, setUserInfo] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getUserApi(user.id).then(response => {
            setUserInfo(response)
        })
    }, [user])
    return (
        <div className="box">
            { index === 0 && <p>Buscar: {searchName} </p>}
            <Media as={Link} to={`/${user.id}`} className="list-search-user" key={user.id}>








                <Image className="mr-3 avatar"
                    roundedCircle
                    width={48}
                    height={48}
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

                </Media.Body>
            </Media>

        </div>
    )
}
