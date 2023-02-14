const CONFIG_API = {
    url: 'https://sb-cats.herokuapp.com/api/2/zubkov',
    headers: {
        'Content-type': 'application/json'
    }
}

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponse(result) {
        return result.ok ? result.json() : Promise.reject({ ...result, message: 'Ошибка сервера' })
    }

    getCats() {
        return fetch(`${this._url}/show`, {
            method: 'GET'
        }).then(this._onResponse)
    }

    getCat(idCat) {
        return fetch(`${this._url}/show/${idCat}`, {
            method: 'GET'
        }).then(this._onResponse)
    }

    getIds() {
        return fetch(`${this._url}/ids`, {
            method: 'GET'
        }).then(this._onResponse)
    }

    addCat(body) {
        return fetch(`${this._url}/add`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(this._onResponse)
    }

    updCat(idCat, body) {
        return fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(this._onResponse)
    }

    deleteCat(idCat) {
        return fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        }).then(this._onResponce)
    }
}

const api = new Api(CONFIG_API);