import {InventoryItem, RentItem, User} from '@services/types';
import {ApiItemTypeResponse} from '@services/supping-api';
import {createContext} from 'react';
import {initUser} from './InitState';

export interface Context {
    state: State;
    setState: (newState: Partial<State>) => void;
}

export interface State {
    user: User;
    rentItems: RentItem[];
    inventoryItems: InventoryItem[];
    itemTypes: ApiItemTypeResponse[]
};

export const defaultState: Context = {
    state: {
        user: initUser,
        rentItems: [],
        inventoryItems:[],
        itemTypes:[],
    },
    setState: () => { },
}

export const AppContext = createContext<Context>(defaultState);