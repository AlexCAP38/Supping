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
          </Route>
          <Route path="/users" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </AppContext.Provider>
  );
}