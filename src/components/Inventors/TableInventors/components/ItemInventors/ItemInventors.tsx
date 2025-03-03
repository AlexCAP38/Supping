import './ItemInventors.scss';
import block from 'bem-cn-lite';
import React from 'react';
import {Checkbox} from '@gravity-ui/uikit';
import {ApiItemResponse} from '@services/supping-api';

const b = block('inventory-item');

interface ItemInventorsProps {
  className: string;
  item: ApiItemResponse;
}

export function ItemInventors({className, item}: ItemInventorsProps) {

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