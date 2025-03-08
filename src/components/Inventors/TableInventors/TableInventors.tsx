import './TableInventors.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';
import {Text, Loader, Button} from '@gravity-ui/uikit';
import {ApiItemResponse} from '@services/supping-api';
import {api} from '@services/api';
import {sortOption} from '../../../pages/AdminPage/AdminPage';
import {ItemInventors} from './components/ItemInventors/ItemInventors';
import {ModalInventors} from './components/ModalInventors/ModalInventors';

const b = block('table-inventors');

export function TableInventors() {
    const [items, setItems] = useState<ApiItemResponse[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    //Статус обновить таблицы
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [showModalStock, setShowModalStock] = useState<boolean>(false);

    //Выбранный элемент
    const [itemCurrent, setItemCurrent] = useState<ApiItemResponse | undefined>(undefined);


    useEffect(() => {
        setShowLoader(true)

        //Можно добавить опции сортировки
        api.v1.findAllByFilter3(sortOption)
            .then((response) => {
                setItems(response.data)
                setShowLoader(false);
                setUpdateTable(false)
            })
            .catch((error) => console.log('Ошибка получения списка инвентаря', error))
    }, [updateTable])

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
                    return <ItemInventors
                        className='grid-table-inventors'
                        item={item}
                        key={item.id}
                        itemCurrent={(item) => setItemCurrent(item)}
                        showModalInventors={(status) => setShowModalStock(status)}
                        updateTable={(value) => setUpdateTable(value)}
                        />
                })
            }
            <Button
                className={b('table-btn')}
                onClick={() => {
                    setShowModalStock(true);
                }}
            >
                Добавить новую инвентарь
            </Button>
            <ModalInventors
                showModal={showModalStock}
                closeModal={() => {
                    setShowModalStock(state => !state)
                    //При закрытии почистим состояние инпутов
                    setItemCurrent(undefined);
                }}
                currentItem={itemCurrent}
                updateTable={(value) => setUpdateTable(value)}
            />
        </div >
    )
}