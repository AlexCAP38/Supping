type StatusRent = 'HOME' | 'RENTED_OUT' | 'NO_ACTIVE' | 'DELETE';
export type StatusItem = 'NEW' | 'ERROR' | 'PAY' | 'NO_PAY' | 'DELETED' | 'DELETE_SHORT_TIME';


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
    status: StatusRent,
    volt: number,
    lowEnergy: boolean,
    image: string
}

export type RentItem = {
    id: string,
    item: Item,
    status: StatusItem,
    description: string,
    startTime: string,
    endTime: string,
    rentTime: number,
    rentCost: number,
    rentCostFact: number,
    createdAt: string
}

export interface RentList {
    activeUser: User,
    day: string,
    totalCost: number,
    rents: {
        totalPages: number,
        totalElements: number,
        size: number,
        content: RentItem[],
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


export type InventoryItem = {
    id: string,
    number: number,
    name: string,
    description: string,
    type: {
        id: string,
        name: string,
        cost: number,
        description: string,
    },
    status: StatusRent,
    volt: number,
    lowEnergy: boolean,
    image: string,
}
