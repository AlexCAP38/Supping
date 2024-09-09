interface Idata {
    saveData: boolean;
    server: {
        publicKey: string;
        Address: string;
        keepalive: string;
        allowedps: [string];
    }
    client: {
        nameProfile: string;
        publicKey: string;
        privatKey: string;
        Address: [string];
        dns: [string];
    }

}

export function saveLocalStorage(data: Idata) {

}

export function loadLocalStorage(data: Idata) {

}