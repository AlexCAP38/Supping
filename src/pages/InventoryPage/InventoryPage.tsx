import './InventoryPage.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '@context/Context';
import {InventItem} from '@components/InventItem/InventItem';
import {api} from '@services/api';
import {ApiItemResponse} from '@services/supping-api';

const b = block('inventory');

function sortItemsByTypeAndDescription(items: ApiItemResponse[]) {

  //TODO Переделать/Вынести сортировку в списке инвентаря
  const typeOrder = [
    "SUP",
    "Каяк 1 место",
    "Каяк 2 места",
    "Комфорт"
  ]

  if (!Array.isArray(items)) return [];

  const typeOrderMap = new Map(typeOrder.map((name, index) => [name, index]));

  return items.slice().sort((a, b) => {

    const aTypeName = a?.type?.name ?? '';
    const bTypeName = b?.type?.name ?? '';
    const aDescription = a?.description ?? '';
    const bDescription = b?.description ?? '';

    const aTypeIndex = typeOrderMap.get(aTypeName) ?? Infinity;
    const bTypeIndex = typeOrderMap.get(bTypeName) ?? Infinity;

    if (aTypeIndex !== bTypeIndex) {
      return aTypeIndex - bTypeIndex;
    }

    return aDescription.localeCompare(bDescription, 'ru');
  });
}

export function InventoryPage() {
  const {state: {inventoryItems}, setState} = useContext(AppContext);

  useEffect(() => {

    api.v1.findAllByFilter3({
      // сортировка пока не нужна
      sort: {
        field: "description",
        // field: "type.name",
        direction: "ASC"
      },
      itemStatus: 'HOME'
    })
      .then((response) => {
        const items = sortItemsByTypeAndDescription(response.data);
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
          <InventItem item={item} key={item.id} />
        ))
      }
    </div>
  );
}