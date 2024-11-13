import {RentItem, InventoryItem} from "@services/types";

export interface State {
    rentItems: RentItem[];
    inventoryItems: InventoryItem[];
};

export interface Context {
    state: State;
    setState: (newState: Partial<State>) => void;
}