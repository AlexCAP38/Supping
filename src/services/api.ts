const URL = import.meta.env.VITE_API_URL;

export const getUsers = () => {
    fetch(`${URL}/v1/users/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                sort: {
                    field: 'lastName',
                    direction: 'ASC'
                },
                search: ''
            }
        )
    })
}

interface InewUser {
    firstName: string,
    lastName: string,
    login: string
}

export const createUser = (user:InewUser) => {
    fetch(`${URL}/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}