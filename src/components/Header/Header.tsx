import './Header.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext} from "react";
import {Link} from "react-router-dom";
import {Text} from '@gravity-ui/uikit';

import {AppContext} from "@context/Context";

const b = block('header');

export const Header: FC = () => {
  const {state: {user}, setState} = useContext(AppContext);

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
      <Text className={b('text')}>
        {new Date().toLocaleDateString('ru-RU')}</Text>
      <Link className={b('link')} to='/user'>
        <Text className={b('text', {status: !user.active})}>{returnActiveUser()}</Text>
      </Link>
    </div>
  )
}