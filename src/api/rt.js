import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";


export async function rtApi(rtid) {
    const url = `${API_HOST}/altaRT`;

    const data = {
        rtid,
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

export async function rtWhitQuoteApi(rtidmsj, mensaje) {
    const url = `${API_HOST}/altaRTconMensaje`;

    const data = {
        rtidmsj,
        mensaje
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
    });
}


export function removeRTApi(tweetID) {
    const url = `${API_HOST}/bajaRT?id=${tweetID}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
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

export function getRTApi(tweetID) {
    const url = `${API_HOST}/consultaRT?id=${tweetID}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
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

export function leoRTs(tweetID, page) {
    const url = `${API_HOST}/leoRTs?id=${tweetID}&pagina=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
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


export function getUserTweetAndRTApi(idUser, page) {
    const url = `${API_HOST}/leoUsuariosConRTs?id=${idUser}&page=${page}`;
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