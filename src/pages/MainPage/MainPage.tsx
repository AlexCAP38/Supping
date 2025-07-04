import './MainPage.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState, useContext} from 'react';
import {Outlet, useNavigate} from 'react-router';
import {Loader} from '@gravity-ui/uikit';
import {Footer} from '@components/Footer';
import {Header} from '@components/Header/Header';
import {api} from '@services/api';
import {AppContext} from '@context/Context';
import {cacheImage, dbPromise} from '@context/IndexDB'
import {ApiActiveUserResponse, ApiRentResponse} from '@services/supping-api';
import {User} from '@services/types';
import {tokenStorage} from '@utils/tokenStorage';

const b = block('main-page');

export function MainPage() {
  const {state, setState} = useContext(AppContext);
  const {options: {reloadPage}, user} = state;
  const [showLoader, setShowLoader] = useState(true);
  const [timeUpdate, setTimeUpdate] = useState(10000);
  const navigate = useNavigate();

  const fetchData = () => {
    //Получаем весь список арендованного инвентаря
    api.v1.findAllByFilter2(
      {
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
        const userInfo = response.data?.userInfo as User;
        const assignedUser = response.data?.assignedUser as ApiActiveUserResponse;
        const items = response.data.rents?.content as ApiRentResponse[];

        setState({
          user: {
            ...state.user,
            ...userInfo,
            assignedUser: assignedUser
          },
          rentItems: items ? items : [],
          options: {
            ...state.options,
            reloadPage: false
          }
        });

        setShowLoader(false);

        items.forEach((item) => item?.item?.image && cacheImage(item.item.image))
      })
      .catch((error) => {
        // TODO: добавить обработку ошибок (например, модальное окно)
        if (error.status === 401 || error.status === 403) {
          //Удаляем все токены, они не валидные
          tokenStorage.clear();
          navigate('/login')
        }
        console.log('Не удалось получить данные');
      });
  };

  useEffect(() => {
    //проверка токена
    if (!user.token) {
      navigate('/login')
    } else {
      //Таймер обновления
      //Следим за флагом обновления страницы
      fetchData();
      const intervalId = setInterval(fetchData, timeUpdate);
      return () => clearInterval(intervalId);
    }
  }, [timeUpdate, reloadPage]);

  return (
    <div className={b()}>
      {!user.token ?
        null
        :
        <>
          <Header />
          {showLoader
            ? <Loader size='l' className={b('loader')} />
            : <Outlet />}
          <Footer />
        </>
      }
    </div>
  );
}