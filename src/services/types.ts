import {ApiAccountResponse, ApiItemResponse, ApiRentResponse, ApiUserResponse} from '@services/supping-api';

type StatusRent = ApiItemResponse['status'];

export type StatusItem = ApiRentResponse['status'];

export interface User extends ApiUserResponse {
    token?: string | null | undefined;
    role?: ApiAccountResponse['role'];
};

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
