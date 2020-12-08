import React from 'react';
import "./Error404.scss";
import BasicLayout from "../../layout/BasicLayout";

export default function Error404(props) {

    return (
        <BasicLayout setRefreshCheckLogin={props.setRefreshCheckLogin} className="error404">
            <h2>Lo sentimos, esa página no existe.</h2>
            <h3>¿Por qué no intentas hacer una búsqueda para encontrar algo más?</h3>
        </BasicLayout>
    )
}
