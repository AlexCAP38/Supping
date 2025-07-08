import './Item.scss';

import React from 'react';
import {ApiUserResponse} from '@services/supping-api';
import block from 'bem-cn-lite';

const b = block('user');

interface ItemUserProps {
  item: ApiUserResponse;
  onClick: () => void
}

export function Item({item, onClick}: ItemUserProps) {

  return (
    <div className={b('')} onClick={() => onClick()}>
      <div className={b("login")}>{item.login}</div>
      <div className={b("name")}>{`${item.lastName} ${item.firstName}`}</div>
      <div className={b("active")}>{item.active ? '+' : null}</div>
      <div className={b("zp")}>{item.totalValue}</div>
    </div>
  );
}