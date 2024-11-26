import React, {useContext, useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import {UserLabel, Button, Modal, Text, TextArea, TextInput, Icon} from '@gravity-ui/uikit';
import {TrashBin, CirclePlusFill, ArrowRotateRight, Person, PersonXmark, PlayFill} from '@gravity-ui/icons';
import {MainContext} from '@context/Context';
import {Item} from '@components/Item';

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
          <Item item={item} />
        ))
      }
    </div>
  );
}