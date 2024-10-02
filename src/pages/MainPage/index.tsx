import React, {useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import './MainPage.scss';
import {Footer} from './components/Footer';
import {Header} from './components/Header'
import {Item} from './components/Item';
import {getUsers, getItems, getRentList} from '@services/api';
import {User, RentItem} from '@services/types';
import {Spin} from '@gravity-ui/uikit';

const b = block('container');

export function MainPage() {
  const [activeUser, setActiveUser] = useState<User | ''>('');
  const [rentItemsList, setRentItemsList] = useState<RentItem[]>([]);

  useEffect(() => {

    getRentList()
      .then((data) => {
        setActiveUser(data.activeUser);
        setRentItemsList(data.rents.content);
      })
      .catch(() => {
        //TODO сделать модалку
        console.log('не могу получить доступ к АПИ');
      })



    // getUsers()
    //   .then((data) => {
    //     setUserList(data);
    //   })
    //   .catch(() => {
    //     //TODO сделать модалку
    //     console.log('не могу получить доступ к АПИ');
    //   })
    // getItems()
    //   .then((data) => {
    //     setItemList(data);
    //   })
    //   .catch(() => {
    //     //TODO сделать модалку
    //     console.log('не могу получить доступ к АПИ');
    //   })

  }, []);

  function returnActiveUser() {
    if (activeUser) {
      return activeUser.firstName === activeUser.lastName
        ? `${activeUser.firstName}`
        : `${activeUser.firstName} ${activeUser.lastName}`
    }
    return ''
  }

  return (
    <>
      <Header userActive={returnActiveUser()} />
      {rentItemsList.length === 0
        //TODO сюда сделать нормальную модалку
        ? <Spin size='xl' />
        : rentItemsList.map((item) => (
          <Item key={item.id} rentItem={item} />
        ))
      }
      <Footer />
    </>
  );
}