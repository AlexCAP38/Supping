import {Api} from "./supping-api";
import {tokenStorage} from '@utils/tokenStorage';

const URL = import.meta.env.VITE_API_URL;

export const api = new Api({
    baseURL: URL,
    securityWorker: () => {
        const token = tokenStorage.get();
        if (token) {
            return {
                headers: {
                    'access-token': token,
                },
            };
        }
        return {};
    }
});