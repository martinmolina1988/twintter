import React from 'react'
import "./chat.scss"
export default function H2(props) {
    const { nombre, apellidos } = props;
    return (
        <div className="h3">
            <h3>{nombre}   {apellidos} </h3>
        </div>
    )
}
