import React, {useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import './MainPage.scss';
import {Footer} from './components/Footer';
import {Item} from './components/Item';
import {getUsers, getItems} from '@services/api';
import {User, Item as IItem} from '@services/types';
import {Spin} from '@gravity-ui/uikit';

const b = block('container');

export function MainPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [itemList, setItemList] = useState<IItem[]>([]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUserList(data);
      })
      .catch(() => {
        //TODO сделать модалку
        console.log('не могу получить доступ к АПИ');
      })
    getItems()
      .then((data) => {
        setItemList(data);
      })
      .catch(() => {
        //TODO сделать модалку
        console.log('не могу получить доступ к АПИ');
      })

  }, []);

  function returnActiveUser() {
    let user = '';

    userList?.forEach((item) => {
      if (item.active === true)
        return user = item.firstName === item.lastName
          ? `${item.firstName}`
          : `${item.firstName} ${item.lastName}`
    })
    return user
  }

  return (
    <>
      <Footer userActive={returnActiveUser()} />
      {itemList.length === 0
        ? <Spin size='xl' />
        : itemList.map((item) => (
          <Item key={item.id} item={item} />
        ))
      }
    </>
  );
}