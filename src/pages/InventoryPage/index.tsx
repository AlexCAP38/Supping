import React, {useContext, useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import {UserLabel, Button, Modal, Text, TextArea, TextInput} from '@gravity-ui/uikit';
import {MainContext} from '@context/Context';

import './InventoryPage.scss';
import {getInventoryList} from '@services/api';

const b = block('inventory');

export function InventoryPage() {
  const {state: {inventoryItems}, setState} = useContext(MainContext);

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
          <div className={b('item')} key={item.id}>
            <div className='name'>{item.name}</div>
            <div>
              <div className='number'>{item.number}</div>
            </div>
            <div>{item.type.cost}</div>
            <div>{item.type.cost}</div>
            <div>{item.type.cost}</div>
          </div>
        ))
      }
    </div>
  );
}