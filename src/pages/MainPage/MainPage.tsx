import './MainPage.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState, useContext, useMemo} from 'react';
import {Outlet} from 'react-router';
import {Loader} from '@gravity-ui/uikit';
import {Footer} from '@components/Footer';
import {Header} from '@components/Header/Header';
import {api} from '@services/api';
import {RentItem, User} from '@services/types';
import {AppContext} from '@context/Context';
import {cacheImage, dbPromise} from '@context/IndexDB'

const b = block('main-page');

export function MainPage() {
  const {state: {rentConfig: {reloadPage}}, setState} = useContext(AppContext);
  const [showLoader, setShowLoader] = useState(true);
  const [timeUpdate, setTimeUpdate] = useState(10000);

  //Сортировка Сначала показываем не оплаченные, потом оплаченные
  const sortRentItems = (items: RentItem[]) => {
    const noPay = items.filter((item) => item.status === 'NEW' || item.status === 'NO_PAY');
    const pay = items.filter((item) => item.status === 'PAY');

    return ([...noPay, ...pay])
  }

  const fetchData = () => {
    //Получаем весь список арендованного инвентаря
    api.v1.findAllByFilter2(
      {
        // сортировка пока не нужна
        sort: {
          field: "createdAt",
          direction: 'DESC'
        },
        // Возвращать список за сегодняшний день
        //TODO вынесли в UI
        actualOnly: true,
        page: 0,
        size: 1000
      })
      .then((response) => {
        const user = response.data?.activeUser as User;
        const items = response.data.rents?.content as RentItem[];

        setState({
          user: user,
          rentItems: sortRentItems(items),
          rentConfig:{reloadPage:false}
        });

        setShowLoader(false);

        items.forEach((item) => item.item.image && cacheImage(item.item.image))
      })
      .catch(() => {
        //TODO: добавить обработку ошибок (например, модальное окно)
        console.log('Не удалось получить данные');
      });
  };

  //Таймер обновления
  //Следим за флагом обновления страницы
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, timeUpdate);
    return () => clearInterval(intervalId);
  }, [timeUpdate, reloadPage]);

  return (
    <div className={b()}>
      <Header />
      {showLoader
        ? <Loader size='l' className={b('loader')} />
        : <Outlet />}
      <Footer />
    </div>
  );
}