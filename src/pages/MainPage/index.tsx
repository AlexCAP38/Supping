import React, {useEffect, useState, useContext} from 'react';
import block from 'bem-cn-lite';
import {Footer} from '@components/Footer';
import {Header} from '@components/Header';
// import {Item} from '../../components/RentItem';
import {getUsers, getItems, getRentList, sendPayment} from '@services/api';
import {MainContext} from '@context/Context';
import {User, RentItem} from '@services/types';
import {Loader} from '@gravity-ui/uikit';
import {Outlet} from 'react-router';
import './MainPage.scss';

const b = block('main-page');

export function MainPage() {
  const {state, setState} = useContext(MainContext);
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