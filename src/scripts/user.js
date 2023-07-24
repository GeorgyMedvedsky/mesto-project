import { api } from './api.js';
import * as utils from './utils.js';
import {profilePopupWithForm} from '../index.js';

export class UserInfo {
    constructor({name, about}){
        this._name = name;
        this._about = about;
    }

    getUserInfo() {
        return {name: this._name, about: this._about}
    }

    setUserInfo(name, about) {
        this._name = name;
        this._about = about;
        api.setProfileData(this._name, this._about)
            .then(() => {
                utils.profileName.textContent = this._name;
                utils.profileJob.textContent = this._about;
                profilePopupWithForm.closePopup(utils.popupForProfile);
            })
            .catch(err => console.error(err)); 
    }
}