import './AdminPage.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {AsideHeader, MenuItem} from '@gravity-ui/navigation';
import {ApiFilterRequest} from '@services/supping-api';
import {api} from '@services/api';
import {AppContext} from '@context/Context';
import logo from '@assets/favicon/sup.svg'
import {Outlet, useNavigate} from 'react-router';

//Опции сортировка по умолчанию
export const sortOption: ApiFilterRequest = {
  sort: {
    field: 'name',
    direction: 'ASC'
  }
}

const b = block('admin-page');

export function AdminPage() {
  const navigation = useNavigate();
  const {state, setState} = useContext(AppContext);

  //Создаем пункты меню
  const menuItems: MenuItem[] = [
    {
      id: 'inventors',
      title: 'Инвентарь',
      onItemClick: () => navigation('inventors')
    },
    {
      id: 'stocks',
      title: 'Скидки / Акции',
      onItemClick: () => navigation('stocks')
    },
    {
      id: 'types',
      title: 'Типы инвентаря',
      onItemClick: () => navigation('types')
    },
    {
      id: 'users',
      title: 'Пользователи',
      onItemClick: () => navigation('users')
    },
    {
      id: 'report',
      title: 'Отчет',
      onItemClick: () => navigation('report')
    }
  ]

  useEffect(() => {
    //Получаем список типов инвентаря
    api.v1.findAllByFilter4(sortOption)
      .then((response) => {
        setState({
          itemTypes: response.data
        })
      })
      .catch((error) => console.log('Ошибка получения списка типов инвентаря', error))
  }, [])

  return (
    <div className={b()}>
      <AsideHeader
      className={b('side-bar')}
        menuItems={menuItems}
        compact={false}
        expandTitle='expandTitle'
        headerDecoration={true}
        logo={{
          text: 'Supping',
          iconSrc: logo,
          onClick: () => navigation('/')
        }}
        renderContent={() => <Outlet />}
      />

    </div>
  );
}