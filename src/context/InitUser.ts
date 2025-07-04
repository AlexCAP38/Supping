import {tokenStorage} from '@utils/tokenStorage'
import {jwtDecode} from "jwt-decode";

const token = tokenStorage.get();

export interface JWT {
    sub: string;
    exp: number;
    id: string;
    role: "ADMIN" | "USER" | "SYSTEM" | undefined
}

let decoded: JWT = {
    id: '',
    role: undefined,
    sub: '',
    exp: 0
};

if (token) {
    decoded = jwtDecode(token);
}

export const initUser = {
    id: '',
    token: token,
    role: decoded.role,
    firstName: "",
    lastName: "",
    active: false
}