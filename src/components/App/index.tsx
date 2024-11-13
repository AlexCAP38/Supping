import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@gravity-ui/uikit';
import {MainProvider} from '@context/Context';
import {LoginPage} from '@pages/LoginPage';
import {MainPage} from '@pages/MainPage';
import {RentPage} from '@pages/RentPage';
import {InventoryPage} from '@pages/InventoryPage';

export function App() {
  return (
    <MainProvider>
      <ThemeProvider theme="light">
        <Routes>
          <Route path="/supping" element={<MainPage />}>
            <Route index element={<RentPage />} />
            <Route path="inventory" element={<InventoryPage />} />
          </Route>
          <Route path="/supping/user" element={<LoginPage />} />
          {/* <Route path="/" element={<Wrapper />}>
                        <Route path="" index element={<IndexPage />} />
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/remind-pass" element={<RemindPass />}></Route>
                        <Route path="*"></Route>
                        </Route>
                        <Route path="/home" element={<HomePage />}></Route> */}
        </Routes>
      </ThemeProvider>
    </MainProvider>
  );
}