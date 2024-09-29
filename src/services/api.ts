const URL = import.meta.env.VITE_API_URL;

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    active: boolean
}

export const getUsers = (): Promise<IUser[]> => {
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

interface INewUser {
    firstName: string,
    lastName: string,
    login: string
}

export const createUser = (user: INewUser) => {
    return fetch(`${URL}/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export const setUserActive = (id: string): Promise<IUser> => {
    return fetch(`${URL}/v1/users/active/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        if (response.ok) return response.json()
    })
}

export type IItem = {
    id: string,
    number: number,
    name: string,
    description: string,
    type: {
        id: string,
        name: string,
        cost: number,
        description: string
    },
    status: string,
    volt: number,
    lowEnergy: boolean,
    image: string
}

export const getItems = (): Promise<IItem[]> => {
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