class Api {
    constructor(config) {
        this.config = config;
    }

    _checkResponse(res) {
        return !res.ok ? Promise.reject(`Ошибка: ${res.status}`) : res.json();
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
      }

    getInitialCards() {
        return this._request(`${this.config.baseUrl}/cards`, {
            headers: this.config.headers
        })
    }

    getProfileData() {
        return this._request(`${this.config.baseUrl}/users/me`, {
            headers: this.config.headers
        })
    }

    setProfileData(name, about) {
        return this._request(`${this.config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.config.headers,
            body: JSON.stringify({name, about})
        })
    }

    addNewCard(name, link) {
        return this._request(`${this.config.baseUrl}/cards`, {
            method: 'POST',
            headers: this.config.headers,
            body: JSON.stringify({name, link})
        })
    }

    deleteCardFromServ(cardId) {
        return this._request(`${this.config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.config.headers
        })
    }

    updateAvatar(avatar) {
        return this._request(`${this.config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.config.headers,
            body: JSON.stringify({avatar})
        })
    }

    setLike(cardId) {
        return this._request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.config.headers
        })
    }

    deleteLike(cardId) {
        return this._request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.config.headers
        })
    }

}

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: '150d7da5-c5ff-47a3-9dc0-d14b9b96c88c',
        'Content-Type': 'application/json'
    }
})