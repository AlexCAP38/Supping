import {User} from '@services/types';
import {ApiItemTypeResponse,ApiItemResponse, ApiRentResponse} from '@services/supping-api';
import {createContext} from 'react';
import {initUser} from './InitUser';

export interface Context {
    state: State;
    setState: (newState: Partial<State>) => void;
}

export interface State {
    user: User;
    rentItems: ApiRentResponse[];
    options:{
        reloadPage:boolean;
        closingModal: boolean;
    };
    inventoryItems: ApiItemResponse[];
    itemTypes: ApiItemTypeResponse[]
};

export const defaultState: Context = {
    state: {
        user: initUser,
        rentItems: [],
        options:{
            reloadPage:false,
            closingModal: false,
        },
        inventoryItems:[],
        itemTypes:[],
    },
    setState: () => { },
}

export const AppContext = createContext<Context>(defaultState);