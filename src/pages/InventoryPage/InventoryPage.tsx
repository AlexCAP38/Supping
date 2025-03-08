import './InventoryPage.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '@context/Context';
import {Item} from '@components/Item';
import {getInventoryList} from '@services/api';

const b = block('inventory');

export function InventoryPage() {
  const {state: {inventoryItems}, setState} = useContext(AppContext);

  useEffect(() => {
    getInventoryList()
      .then((data) => {
        setState({inventoryItems: data});
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
        <div>день</div>
      </div>
      {
        inventoryItems.map((item) => (
          <Item item={item} />
        ))
      }
    </div>
  );
}