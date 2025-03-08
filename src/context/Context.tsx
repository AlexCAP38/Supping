import {InventoryItem, RentItem} from '@services/types';
import {ApiItemTypeResponse} from '@services/supping-api';
import {createContext} from 'react';

export interface Context {
    state: State;
    setState: (newState: Partial<State>) => void;
}

export interface State {
    rentItems: RentItem[];
    inventoryItems: InventoryItem[];
    itemTypes: ApiItemTypeResponse[]
};

export const defaultState: Context = {
    state: {
        rentItems: [],
        inventoryItems:[],
        itemTypes:[],
    },
    setState: () => { },
}

export const AppContext = createContext<Context>(defaultState);