import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";


export function checkBlockedApi(idUser, usuariobloqueadoid) {
    const url = `${API_HOST}/consultaBloqueo?usuarioid=${idUser}&usuariobloqueadoid=${usuariobloqueadoid}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();

    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export function BlockedUserApi(idUser) {
    const url = `${API_HOST}/altaBloqueo?id=${idUser}`;

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function unBlockedUserApi(idUser) {

    const url = `${API_HOST}/bajaBloqueo?id=${idUser}`

    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result
    }).catch(err => {
        return err;
    });
}