import React from 'react';
import { isEmpty, map } from 'lodash';
import "./ListUsers.scss";
import User from "./User";

export default function ListUsers(props) {

    const { users } = props;


    if (isEmpty(users)) {
        return <p className="p">No hay resultados.</p>
    }

    if (!isEmpty(users)) {
        return (
            <ul className="list-users">
                {map(users, user =>
                (
                    <User key={user.id} user={user} />
                ))}
            </ul>
        )
    }
}
