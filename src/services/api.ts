const URL = import.meta.env.VITE_API_URL;

import {
    RentList,
    User,
    NewUser,
    Item
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
                // sort: {
                //     field: "id",
                //     direction: "ASC"
                // },
                page: 0,
                size: 10
            }
        )
    }).then((response) => {
        if (response.ok) return response.json()
    })
}