import {ApiItemResponse, ApiRentResponse, ApiUserResponse} from '@services/supping-api';

type StatusRent = 'HOME' | 'RENTED_OUT' | 'NO_ACTIVE' | 'DELETE';

export type StatusItem = 'NEW' | 'ERROR' | 'PAY' | 'NO_PAY' | 'DELETED' | 'DELETE_SHORT_TIME';

export interface User extends ApiUserResponse {};

export interface NewUser {
    firstName: string,
    lastName: string,
    login: string
}

export interface RentItem {
    id: string,
    item: ApiItemResponse,
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

export interface InventoryItem {
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
