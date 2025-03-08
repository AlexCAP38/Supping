import './ItemInventors.scss';
import block from 'bem-cn-lite';
import React from 'react';
import {Checkbox, Icon} from '@gravity-ui/uikit';
import {ApiItemResponse} from '@services/supping-api';
import {CircleXmark} from "@gravity-ui/icons";
import {api} from '@services/api';

const b = block('inventory-item');

interface ItemInventorsProps {
  className: string;
  item: ApiItemResponse;
  itemCurrent: (item: ApiItemResponse) => void;
  showModalInventors: (value: boolean) => void;
  updateTable: (value: boolean) => void;
}

export function ItemInventors({className, item, itemCurrent, showModalInventors, updateTable}: ItemInventorsProps) {

  function sendCurrentItem(item: ApiItemResponse, event: React.MouseEvent) {
    if ((event.target as HTMLInputElement).closest('.g-checkbox__control')) {
      // Если клик был по чекбоксу — не выполнять sendCurrentItem
      return;
    }

    itemCurrent(item);
    showModalInventors(true);
  }

  function setActiveItem(id: string) {
    api.v1.enableItem(id)
      .then((response) => {
        updateTable(true);
      })
  }

  function setDisableItem(id: string) {
    api.v1.disableItem(id)
      .then((response) => {
        updateTable(true);
      })
  }

  return (
    <div className={b('', className)} onClick={(event) => sendCurrentItem(item, event)}>
      <div className={b("active")}>
        {(item.status === 'HOME' || item.status === 'RENTED_OUT') &&
          <Checkbox
            size='l'
            checked={true}
            className={b('checkbox')}
            onChange={(event) => {
              event.stopPropagation();
              setDisableItem(item.id!)
            }
            } />}
        {item.status === 'NO_ACTIVE' &&
          <Checkbox
            size='l'
            checked={false}
            className={b('checkbox')}
            onChange={(event) => {
              event.stopPropagation();
              setActiveItem(item.id!)
            }
            } />}
        {item.status === 'DELETE' && <Icon data={CircleXmark} size={17} />}
      </div>
      <div className={b("type")}>{item.type?.name}</div>
      <div className={b("name")}>{item.description}</div>
      <div className={b("foto")}>
        <img src={item.image} alt="фото инвентаря" />
      </div>
      <div className={b("invent-number")}>{item.name}</div>
      <div className={b("battery")}>{item.lowEnergy ? 'заменить' : 'норм'}</div>
      <div className={b("price")}>{item.type?.cost}</div>
    </div>
  );
}