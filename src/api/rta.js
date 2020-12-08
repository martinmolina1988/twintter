import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export async function getResponseApi(search, page) {
    const url = `${API_HOST}/leoRespuestas?id=${search}&pagina=${page}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {

        return err;
    })

}

export function getResponseCountApi(id) {
    const url = `${API_HOST}/leoCantidadRespuestas?id=${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {

        return err;
    })

}

export async function addResponseApi(rtaid, mensaje, userrtaid) {

    const url = `${API_HOST}/respuesta`;

    const data = {

        rtaid,
        mensaje,
        userrtaid
    }
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {

        return err;
    })

}