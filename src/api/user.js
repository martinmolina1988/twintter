import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export async function getUserApi(id) {
    const url = `${API_HOST}/verperfil?id=${id}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`

        }
    }

    try {
        const response = await fetch(url, params);
        // eslint-disable-next-line no-throw-literal
        if (response.status >= 400)
            throw null;
        const result_2 = await response.json();
        return result_2;
    } catch (err) {
        return err;
    }
}


export function uploadBannerApi(file) {
    const url = `${API_HOST}/subirBanner`;

    const formData = new FormData();
    formData.append("banner", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function uploadAvatarApi(file) {
    const url = `${API_HOST}/subirAvatar`;

    const formData = new FormData();
    formData.append("avatar", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function updateInfoApi(data) {
    const url = `${API_HOST}/modificarPerfil`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response
        }).catch(err => {
            return err;
        });
}
export function updatePasswordApi(data) {
    const url = `${API_HOST}/modificarPassword`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response
        }).catch(err => {
            return err;
        });
}
export function updateEmailApi(data) {
    const url = `${API_HOST}/modificarEmail`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response
        }).catch(err => {
            return err;
        });
}