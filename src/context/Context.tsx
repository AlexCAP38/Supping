import React, {ReactNode, useState, createContext, useCallback} from 'react';
import {Context, State} from './type';

//TODO когда будет АПИ поставить пустышку initialStateProfile
const defaultState: Context = {
    state: {
        rentItems: [],
        inventoryItems:[],
    },
    setState: () => { },
}

export const MainContext = createContext<Context>(defaultState);

export const MainProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, setState] = useState<State>(defaultState.state);

    const updateState = useCallback((newState: Partial<State>) => {
        setState(prevState => ({
            ...prevState,
            ...newState,
        }));
    }, []);

    return (
        <MainContext.Provider value={{state, setState: updateState}}>
            {children}
        </MainContext.Provider>
    );
};
