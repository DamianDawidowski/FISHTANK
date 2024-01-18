export class User {

    constructor(
        public id: number,
        public firstName: string, 
        public lastName: string,
        public login: string,
        private _token: string, 
        public _tokenExpirationDate: Date) {} 

        getToken() {

        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
           return null;
        } 
        return this._token;
         } 

         getUserId() {
            return this.id;
         }

        }
 