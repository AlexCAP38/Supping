import React, {useCallback, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@gravity-ui/uikit';
import {AppContext, defaultState, State} from '@context/Context';
import {
  AdminPage,
  LoginPage,
  MainPage,
  RentPage,
  InventoryPage
} from '@pages/index';
import {TableInventors} from '@components/Inventors/TableInventors/TableInventors';
import {TableStock} from '@components/Inventors/TableStock/TableStock';
import {TableTypes} from '@components/Inventors/TableTypes/TableTypes';

export function App() {
  const [state, setState] = useState<State>(defaultState.state);

  const updateState = useCallback((newState: Partial<State>) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  return (
    <AppContext.Provider value={{state, setState: updateState}}>
      <ThemeProvider theme="light">
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<RentPage />} />
            <Route path="inventory" element={<InventoryPage />} />
          <Route path="users" element={<LoginPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} >
            <Route index element={<TableInventors />} />
            <Route path="inventors" element={<TableInventors />} />
            <Route path="stocks" element={<TableStock />} />
            <Route path="types" element={<TableTypes />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AppContext.Provider>
  );
}