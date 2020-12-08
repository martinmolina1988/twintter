import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export async function addTweetApi(mensaje) {

    const url = `${API_HOST}/tweet`;

    const data = {
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


export function getUserTweetApi(idUser, page) {
    const url = `${API_HOST}/leoTweets?id=${idUser}&pagina=${page}`;
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

export function getTweetsFollowersApi(page = 1) {
    const url = `${API_HOST}/leoTweetsSeguidores?pagina=${page}`;
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
    });
}

export function getUsersTweetApi(search, page) {
    const url = `${API_HOST}/leoTweetsTotal?mensaje=${search}&pagina=${page}`;
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


export function likeApi(tweetID) {
    const url = `${API_HOST}/altaLike?id=${tweetID}`;

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
export function removeLikeApi(tweetID) {
    const url = `${API_HOST}/bajaLike?id=${tweetID}`;

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

export function getLikeApi(tweetID) {
    const url = `${API_HOST}/consultaLike?tweetID=${tweetID}`;

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

export function getTweetApi(tweetID) {
    const url = `${API_HOST}/verTweet?id=${tweetID}`;

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

export function deleteTweet(tweetid) {
    const url = `${API_HOST}/eliminarTweet?id=${tweetid}`;

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