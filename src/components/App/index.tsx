import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@gravity-ui/uikit';
import {LoginPage} from '@pages/LoginPage';

export function App() {
  return (
      <ThemeProvider theme="light">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          {/* <Route path="/" element={<Wrapper />}>
                        <Route path="" index element={<IndexPage />} />
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/remind-pass" element={<RemindPass />}></Route>
                        <Route path="*"></Route>
                        </Route>
                        <Route path="/home" element={<HomePage />}></Route> */}
        </Routes>
      </ThemeProvider>
  );
}