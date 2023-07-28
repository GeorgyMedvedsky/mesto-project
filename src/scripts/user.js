export class UserInfo {
    constructor({name, about, avatar, _id}){
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this._id = _id;
    }

    getUserInfo() {
        return {name: this.name, about: this.about, avatar: this.avatar, _id: this._id};
    }

    setUserInfo({name, about, avatar, _id}) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this._id = _id;
    }
}