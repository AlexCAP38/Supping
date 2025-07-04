import {ApiAccountResponse, ApiDailyRentResponse, ApiActiveUserResponse, ApiRentResponse, ApiUserResponse} from '@services/supping-api';

export type StatusItem = ApiRentResponse['status'];

export interface User extends ApiUserResponse {
    token?: string | null | undefined;
    role?: ApiAccountResponse['role'];
    assignedUser?: ApiActiveUserResponse
};

export interface NewUser {
    firstName: string,
    lastName: string,
    login: string
}

// export interface RentList extends ApiDailyRentResponse {
//     activeUser: User,
// }