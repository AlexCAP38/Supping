import React from 'react';
import {Checkbox, Text} from '@gravity-ui/uikit';
import {ApiStockResponse} from '@services/supping-api';
import block from 'bem-cn-lite';

import './ItemStock.scss';

const b = block('item-stock');

interface ItemStockProps {
  item: ApiStockResponse;
  itemCurrent: (item: ApiStockResponse) => void;
  showModalStock: (value: boolean) => void
}

export function ItemStock({item, itemCurrent, showModalStock}: ItemStockProps) {

  const isChecked = (item: ApiStockResponse) => {
    const status = item.status;

    if (status === 'ACTIVE') {
      return true
    }
    else if (status === 'DISABLE') {
      return false
    }
  }

  const isDisable = (item: ApiStockResponse) => {
    const status = item.status;
    return status === 'DISABLE' ? true : false
  }

  function onShowModalStock() {
    showModalStock(true);
    itemCurrent(item);
  }

  //TODO в удаленной акции постаци другую иконку а не выключать чек бокс

  return (
    <div className={b('', 'grid-table-stock')} onClick={() => onShowModalStock()}>
      <div className={b("active")}>
        <Checkbox size='l'
          checked={isChecked(item)}
          disabled={isDisable(item)}
        />
      </div>
      <div className={b("name")}>{item.name}</div>
      <div className={b("quantity")}>{item.value}</div>
      <div className={b("measure")}>{item.units}</div>
      <div className={b("discount")}>{item.stock}</div>
    </div>
  );
}