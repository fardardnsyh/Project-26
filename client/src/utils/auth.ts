import jwt_decode from 'jwt-decode';


class AuthService {
    
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        type TokenDto = {
            foo: string;
            exp: number;
            iat: number;
        }
        try {
            const decoded: TokenDto = jwt_decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch(err) {
            return false;
        }
    }

    getToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    login(token: string) {
        localStorage.setItem('token', token);
        window.location.assign('/applied');
    }

    logout() {
        localStorage.removeItem('token');
        window.location.assign('/login');
    }
}

export default new AuthService();