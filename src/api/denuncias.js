import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export async function altaComplaint(tweetid, userid) {
    const url = `${API_HOST}/altaDenuncia`;

    const data = {

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


export function getComplaint(page) {
    const url = `${API_HOST}/leoDenunciasPorCantidad?&pagina=${page}`;
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
export function getCountComplaint() {
    const url = `${API_HOST}/leoCantidadDenuncias`;
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