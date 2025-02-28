import React, {useEffect, useState} from 'react';
import {Checkbox, Text} from '@gravity-ui/uikit';
import {ApiItemResponse} from '@services/supping-api';
import block from 'bem-cn-lite';
import './Item.scss';

const b = block('inventory-item');

interface ItemProps {
  className: string;
  item: ApiItemResponse;
}

export function Item({className, item}: ItemProps) {

  return (
    <div className={b('', className)}>
      <div className={b("active")}>
        <Checkbox size='l'/>
      </div>
      <div className={b("type")}>{item.type?.name}</div>
      <div className={b("name")}>{item.description}</div>
      <div className={b("foto")}>добавить фото</div>
      <div className={b("invent-number")}>{item.name}</div>
      <div className={b("battery")}>{item.lowEnergy ? 'заменить' : 'норм'}</div>
      <div className={b("price")}>{item.type?.cost}</div>
    </div>
  );
}