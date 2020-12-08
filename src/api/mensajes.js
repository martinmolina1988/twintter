import { API_HOST } from "../utils/constants";
import { getTokenApi } from "../api/auth";

export async function sendMessage(userrecived, mensaje) {
    const url = `${API_HOST}/envioMensaje`;

    const data = {
        userrecived,
        mensaje,
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
            return { code: response.status, message: "mensaje enviado." };
        }
        return { code: response.status, message: "Error al enviar el mensaje." };
    } catch (err) {
        return err;
    }

}
export async function sendUserMessage(userrecived) {
    const url = `${API_HOST}/mensajeUsuario`;

    const data = {
        userrecived,

    }

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, params);
        if (response.status > 200 && response.status < 400) {
            return { code: response.status, message: "mensaje enviado." };
        }
        return { code: response.status, message: "Error al enviar el mensaje." };
    } catch (err) {
        return err;
    }

}



export function getMessage(pagina, usersend, userrecived) {
    const url = `${API_HOST}/leoMensajes?pagina=${pagina}&usersend=${usersend}&userrecived=${userrecived}`;

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
export function getUserMessage(id, pagina) {
    const url = `${API_HOST}/leoUsuariosMensajes?id=${id}&pagina=${pagina}`;

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

export function getLastesMessage(pagina, usersend, userrecived) {
    const url = `${API_HOST}/leoUltimoMensaje?pagina=${pagina}&usersend=${usersend}&userrecived=${userrecived}`;

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