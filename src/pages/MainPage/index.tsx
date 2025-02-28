import './MainPage.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState, useContext} from 'react';
import {Outlet} from 'react-router';
import {Loader} from '@gravity-ui/uikit';
import {Footer} from '@components/Footer';
import {Header} from '@components/Header';
import {getRentList} from '@services/api';
import {User} from '@services/types';
import {AppContext} from '@context/Context';

const b = block('main-page');

export function MainPage() {
  const {state, setState} = useContext(AppContext);
  const [showLoader, setShowLoader] = useState(true);
  const [activeUser, setActiveUser] = useState<User | ''>('');
  const [timeUpdate, setTimeUpdate] = useState(10000);

  const fetchData = () => {
    getRentList()
      .then((data) => {
        setActiveUser(data.activeUser);
        setState({rentItems: data.rents.content});
      })
      .catch(() => {
        //TODO: добавить обработку ошибок (например, модальное окно)
        console.log('Не удалось получить данные');
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, timeUpdate);
    return () => clearInterval(intervalId);
  }, [timeUpdate]);


  useEffect(() => {
    setShowLoader(false);
  }, [state]);

  function returnActiveUser() {
    if (activeUser) {
      return activeUser.firstName === activeUser.lastName
        ? `${activeUser.firstName}`
        : `${activeUser.firstName} ${activeUser.lastName}`
    }
    return ''
  }

  return (
    <div className={b()}>
      <Header userActive={returnActiveUser()} />
      {showLoader
        ? <Loader size='l' className={b('loader')} />
        : <Outlet />}
      <Footer />
    </div>
  );
}