import './Item.scss';

import React from 'react';
import {ApiUserResponse} from '@services/supping-api';
import block from 'bem-cn-lite';

const b = block('item');

interface ItemUserProps {
  item: ApiUserResponse;
  onClick: () => void
}

export function Item({item, onClick}: ItemUserProps) {

  return (
    <div className={b('', 'grid-table')} onClick={() => onClick()}>
      <div className={b("name")}>{`${item.lastName} ${item.firstName}`}</div>
      <div className={b("active")}>{item.active ? '+' : null}</div>
      <div className={b("zp")}>{item.totalValue}</div>
    </div>
  );
}