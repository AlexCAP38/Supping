import React, {FC, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import block from 'bem-cn-lite';
import {Button, Card, Modal, Text, Spin} from '@gravity-ui/uikit';

import './Header.scss';
import {AppContext} from "@context/Context";

const b = block('header');

export const Header: FC = () => {
    const {state: {user}, setState} = useContext(AppContext);

    const date = new Date(); // Текущая дата

    const day = date.getDate(); // Получаем день
    const month = date.getMonth() + 1; // Получаем месяц (нужно прибавить 1)
    const year = date.getFullYear(); // Получаем год


  function returnActiveUser() {
    if (user) {
      return user.firstName === user.lastName
        ? `${user.firstName}`
        : `${user.firstName} ${user.lastName}`
    }
    return ''
  }

    return (
        <div className={b()}>
            <Text className={b('text')}>{day}.{month}.{year}</Text>
            <button className={b('status-btn')}></button>
            <Link className={b('link')} to='/users'>
                <Text className={b('text')}>{returnActiveUser()}</Text>
            </Link>
        </div>
    )
}