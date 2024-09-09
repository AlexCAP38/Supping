const URL = import.meta.env.VITE_API_URL;

export interface IUsers {
        id: string,
        firstName: string,
        lastName: string,
        active: boolean
}

export const getUsers = (): Promise<IUsers[]> => {
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
    }).then((response)=>{
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

export const setUserActive = (id: string): Promise<IUsers> => {
    return fetch(`${URL}/v1/users/active/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response)=>{
        if (response.ok) return response.json()
    })
}
