import './InventoryPage.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '@context/Context';
import {InventItem} from '@components/InventItem/InventItem';
import {api} from '@services/api';
import {InventoryItem} from '@services/types';

const b = block('inventory');

export function InventoryPage() {
  const {state: {inventoryItems}, setState} = useContext(AppContext);

  useEffect(() => {

    api.v1.findAllByFilter3({
      // сортировка пока не нужна
      sort: {
        field: "type.name",
        direction: "DESC"
      },
      itemStatus: 'HOME'
    })
      .then((response) => {
        const items = response.data as InventoryItem[];
        setState({inventoryItems: items});
      })
      .catch(() => {
        //TODO: добавить обработку ошибок (например, модальное окно)
        console.log('Не удалось получить данные инвентаризации');
      });
  }, [])

  return (
    <div className={b()}>
      <div className={b('caption')}>
        <div>Наименование</div>
        <div>Инв. №</div>
        <div>1 ч.</div>
        <div>3 ч.</div>
        <div>Д.</div>
      </div>
      {
        inventoryItems.map((item) => (
          <InventItem item={item} key={item.id}/>
        ))
      }
    </div>
  );
}