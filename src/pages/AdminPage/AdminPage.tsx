import './AdminPage.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';
import {Text, Loader} from '@gravity-ui/uikit';
import {Item} from './components/Item/Item';
import {ApiItemResponse} from '@services/supping-api';
import {api} from '@services/api';
import {TableStock} from './components/TableStock/TableStock';


const b = block('admin-page');

export function AdminPage() {
  const [items, setItems] = useState<ApiItemResponse[]>([]);
  const [showLoader, setShowLoader] = useState(false);


  useEffect(() => {
    setShowLoader(true)

    //Можно добавить опции сортировки
    api.v1.findAllByFilter3({})
      .then((response) => {
        setItems(response.data)
        setShowLoader(false);
      })
      .catch((error) => console.log('Я б взял сервер на дуэль, да он уже сдался без боя!', error))

  }, [])

  return (
    <div className={b()}>

      <div className={b('table-inventory')}>
        <Text variant='display-2' className={b('table-title')}>Инвентарь</Text>
        <div className={b("columns-name", "grid-table-inventory")}>
          <div>Вкл/выкл <br /> в выдачу</div>
          <div>Тип</div>
          <div>Наименование</div>
          <div>Фото</div>
          <div>Инв.Номер</div>
          <div>Состояние батареи</div>
          <div>Стоимость <br /> номинальная</div>
        </div>
        {showLoader ?
          <Loader className={b('loader')} size='l' />
          :
          items.map((item) => {
            return <Item className='grid-table-inventory' item={item} key={item.id} />
          })}
      </div>
      <TableStock />
    </div>
  );
}