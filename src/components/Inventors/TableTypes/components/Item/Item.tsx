import React from 'react';
import {Checkbox, Text} from '@gravity-ui/uikit';
import {ApiItemTypeResponse} from '@services/supping-api';
import block from 'bem-cn-lite';

import './Item.scss';

const b = block('item');

interface ItemTypeProps {
  item: ApiItemTypeResponse;
  itemCurrent: (item: ApiItemTypeResponse) => void;
  showModalStock: (value: boolean) => void
}

export function Item({item, itemCurrent, showModalStock}: ItemTypeProps) {

  // const isChecked = (item: ApiItemTypeResponse) => {
  //   const status = item.status;

  //   if (status === 'ACTIVE') {
  //     return true
  //   }
  //   else if (status === 'DISABLE') {
  //     return false
  //   }
  // }

  // const isDisable = (item: ApiItemTypeResponse) => {
  //   const status = item.status;
  //   return status === 'DISABLE' ? true : false
  // }

  function onShowModalStock() {
    showModalStock(true);
    itemCurrent(item);
  }

  //TODO в удаленной акции постаци другую иконку а не выключать чек бокс

  return (
    <div className={b('', 'grid-table')} onClick={() => onShowModalStock()}>
      <div className={b("name")}>{item.name}</div>
      <div className={b("cost")}>{item.cost}</div>
      <div className={b("description")}>{item.description}</div>
    </div>
  );
}