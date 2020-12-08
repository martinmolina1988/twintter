import React from 'react';
import { isEmpty, map } from 'lodash';
import "./ListSearchUsers.scss";
import User from "./User";


export default function ListUsers(props) {

    const { users, searchName } = props;



    if (isEmpty(users)) {
        return <p className="p">No hay resultados.</p>
    }

    if (!isEmpty(users)) {
        return (

            <ul className="list-search-users">

                {map(users, (user, index) =>
                (
                    <User key={user.id} user={user} index={index} searchName={searchName} />
                ))}
            </ul>
        )
    }
}
