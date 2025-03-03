import './TableInventors.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';
import {Text, Loader} from '@gravity-ui/uikit';
import {ApiItemResponse} from '@services/supping-api';
import {api} from '@services/api';
import {sortOption} from '../../../pages/AdminPage/AdminPage';
import {ItemInventors} from './components/ItemInventors/ItemInventors';

const b = block('table-inventors');

export function TableInventors() {
    const [items, setItems] = useState<ApiItemResponse[]>([]);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true)

        //Можно добавить опции сортировки
        api.v1.findAllByFilter3(sortOption)
            .then((response) => {
                setItems(response.data)
                setShowLoader(false);
            })
            .catch((error) => console.log('Ошибка получения списка инвентаря', error))
    }, [])

    return (
        <div className={b()}>
            <Text variant='display-2' className={b('table-title')}>Инвентарь</Text>
            <div className={b("columns-name", "grid-table-inventors")}>
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
                    return <ItemInventors className='grid-table-inventors' item={item} key={item.id} />
                })}
        </div >
    )
}