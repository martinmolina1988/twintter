import { API_HOST } from "../utils/constants";
import { getTokenApi } from "../api/auth";

export async function altaNotif(tipo, tweetid, userid) {
    const url = `${API_HOST}/altaNotif`;

    const data = {
        tipo,
        tweetid,
        userid
    }

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, params);
        if (response.status > 200 && response.status < 400) {
            return { code: response.status, message: "Tweet enviado." };
        }
        return { code: response.status, message: "Error al enviar el tweet." };
    } catch (err) {
        return err;
    }

}

export function deleteNotif(user, tipo, tweetid) {
    const url = `${API_HOST}/eliminarNotif?usernotifid=${user}&tipo=${tipo}&tweetid=${tweetid}`;

    const params = {
        method: "DELETE",
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

export function getUserNotifApi(idUser, page) {
    const url = `${API_HOST}/leoNotificaciones?id=${idUser}&pagina=${page}`;
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



export function aumentoNotif(id) {
    const url = `${API_HOST}/aumentoNotif?id=${id}`;

    const params = {
        method: "GET",
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
export function reseteoNotif(id) {
    const url = `${API_HOST}/reseteoNotif?id=${id}`;

    const params = {
        method: "GET",
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