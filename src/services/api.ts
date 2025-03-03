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

export const getItems = (): Promise<Item[]> => {
    return fetch(`${URL}/v1/items/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                sort: {
                    field: 'id',
                    direction: 'ASC'
                }
            }
        )
    }).then((response) => {
        if (response.ok) return response.json()
    })
}

export const getRentList = (): Promise<RentList> => {
    return fetch(`${URL}/v1/rents/list/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                // сортировка пока не нужна
                sort: {
                    field: "status",
                    direction: "ASC"
                },
                page: 0,
                size: 1000
            }
        )
    }).then((response) => {
        if (response.ok) return response.json()
    })
}

export const getInventoryList = (): Promise<InventoryItem[]> => {
    return fetch(`${URL}/v1/items/list/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                // сортировка пока не нужна
                sort: {
                    field: "status",
                    direction: "ASC"
                }
            }
        )
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


export const setRentItem = (id:string): Promise<InventoryItem> => {
    return fetch(`${URL}/v1/rents/${id}/status/start/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) return response.json()
    })
}
