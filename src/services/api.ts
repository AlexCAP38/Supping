import {Api} from "./supping-api";

const URL = import.meta.env.VITE_API_URL;
export const api = new Api({baseURL: URL});



import {
    RentList,
    User,
    NewUser,
    Item,
    RentItem,
    InventoryItem
} from "./types";

export const getUsers = (): Promise<User[]> => {
    return fetch(`${URL}/v1/users/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                sort: {
                    field: 'lastName',
                    direction: 'ASC'
                }
            }
        )
    }).then((response) => {
        if (response.ok) return response.json()
    })
}

export const createUser = (user: NewUser) => {
    return fetch(`${URL}/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export const setUserActive = (id: string): Promise<User> => {
    return fetch(`${URL}/v1/users/active/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        if (response.ok) return response.json()
    })
}


export const sendPayment = (id:string,description: string, paid: number): Promise<RentItem> => {
    return fetch(`${URL}/v1/rents/${id}/status/pay/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {

                description: description,
                paid: paid
            }
        )
    }).then((response) => {
        if (response.ok) return response.json()
    })
}