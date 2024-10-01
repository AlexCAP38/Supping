type StatusRent = 'HOME' | 'RENTED_OUT' | 'NO_ACTIVE' | 'DELETE';
type StatusItem = 'NEW' | 'ERROR' | 'PAY' | 'NO_PAY' | 'DELETED' | 'DELETE_SHORT_TIME';


export type User = {
    id: string,
    firstName: string,
    lastName: string,
    active: boolean
}

export type NewUser = {
    firstName: string,
    lastName: string,
    login: string
}

export type Item = {
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

export interface RentList  {
    activeUser: User,
    day: string,
    totalCost: number,
    rents: {
        totalPages: number,
        totalElements: number,
        size: number,
        content: [
            {
                id: string,
                item: {
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
                    status: StatusRent,
                    volt: number,
                    lowEnergy: boolean,
                    image: string
                },
                status: StatusItem,
                description: string,
                startTime: string,
                endTime: string,
                rentTime: number,
                rentCost: number,
                createdAt: string
            }
        ],
        number: number,
        sort: {
            empty: boolean,
            unsorted: boolean,
            sorted: boolean
        },
        first: boolean,
        last: boolean,
        numberOfElements: number,
        pageable: {
            offset: number,
            sort: {
                empty: boolean,
                unsorted: boolean,
                sorted: boolean
            },
            pageNumber: number,
            pageSize: number,
            paged: boolean,
            unpaged: boolean
        },
        empty: boolean
    }
}
